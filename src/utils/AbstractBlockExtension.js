import { addFilter, doAction, applyFilters } from '@wordpress/hooks'; // Hook into Gutenberg filters

class AbstractBlockExtension {
    #namespace = null;
    #blockToExtend = null;
    #newControls = null;
    #propsModifier = null;
    
    constructor() {
        if (new.target === AbstractBlockExtension) {
          throw new Error("Cannot instantiate AbstractBlockExtension directly.");
        }
    }

    init() {
        const shouldInit = applyFilters(
            'learnhooks.shouldInitExtension',
            true,
            this.#namespace,
            this.#blockToExtend
        );

        if (!shouldInit) return; // skip if filter returns false

        doAction('learnhooks.beforeInit', this.#namespace, this.#blockToExtend);

        addFilter(
            'blocks.registerBlockType',               // Filter called during block registration
            `learnhooks/add-${this.#namespace}-attr`, // Unique namespace for this modification
            this.addAttributes.bind(this)
        );
        
        addFilter(
            'editor.BlockEdit',                       // Filter that lets us wrap the block edit UI
            `learnhooks/${this.#namespace}-controls`, // Namespace
            this.addControls.bind(this)               // Our plain function
        );

        addFilter(
            'blocks.getSaveContent.extraProps',        // Filter before saving block markup
            `learnhooks/save-${this.#namespace}-attr`, // Namespace
            this.addProps.bind(this)
        );

        doAction('learnhooks.afterInit', this.#namespace, this.#blockToExtend);
    }

    addAttributes(settings, name) {
        let blockName = this.#blockToExtend;
        
        if(! blockName) {
            throw new Error("The name of the block you want to extend is not valid.");
        } else if(name != blockName) {
            return settings;
        }

        let modifiedSettings = {
            ...settings,
            attributes: {
                ...settings.attributes,
                customAlt: {
                    type: 'string',
                    default: '',
                },
            },
        };

        modifiedSettings = applyFilters(
            'learnhooks.modifyAttributes',
            modifiedSettings,
            name,
            this.#namespace
        );

        return modifiedSettings;
    }

    addControls(BlockEdit) {
        return ( props ) => {
            // Always render the default BlockEdit UI
            const defaultUI = <BlockEdit {...props} />;

            // If no custom controls were provided or the block type is not the one we want to extend, 
            // just return the default UI
            if ( ! this.#newControls || props.name !== this.#blockToExtend) {
                return defaultUI;
            }

            // Fire an action just before returning combined UI
            doAction(
                'learnhooks.controlsRendered',
                this.#namespace,
                props
            );

            // Otherwise, render default UI + user-provided controls (passing props!)
            return (
                <>
                    { defaultUI }
                    { this.#newControls( props ) }
                </>
            );
        };
    }

    addProps(extraProps, blockType, attributes) {
        // Only affect the targeted block
        if (blockType.name !== this.#blockToExtend) {
            return extraProps;
        }

        // If no custom prop modifier was provided, return unchanged
        if (!this.#propsModifier || typeof this.#propsModifier !== 'function') {
            return extraProps;
        }

        // Delegate to user-defined function for multiple modifications
        let modifiedProps = this.#propsModifier(extraProps, attributes);

         modifiedProps = applyFilters(
            'learnhooks.modifySaveProps',
            modifiedProps,          // current props
            blockType.name,         // block name
            attributes,             // block attributes
            this.#namespace         // which extension applied this
        );

        // Ensure it still returns a valid object
        return typeof modifiedProps === 'object' ? modifiedProps : extraProps;
    }

    set setNamespace(namespace) {
        if(typeof namespace !== 'string') {
            throw new Error('The namespace parameter must be a string');
        }
        
        this.#namespace = namespace;
    }

    set setBlockToExtend(blockName) {
        if(typeof blockName !== 'string') {
            throw new Error('The blockName parameter must be a string');
        }
        
        this.#blockToExtend = blockName;
    }

    set setControls(newControlsFn) {
        if(typeof newControlsFn != 'function') {
            throw new Error('setControls expects a function as parameter: (props) => JSX');
        }

        this.#newControls = newControlsFn;
    }

    set setPropsModifier(modifierFn) {
        if (typeof modifierFn !== 'function') {
            throw new Error(
                'setPropsModifier expects a function: (extraProps, attributes) => modifiedProps'
            );
        }

        this.#propsModifier = modifierFn;
    }

}

export default AbstractBlockExtension;