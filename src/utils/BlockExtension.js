import { addFilter } from '@wordpress/hooks'; // Hook into Gutenberg filters
import { InspectorControls } from '@wordpress/block-editor'; // Sidebar controls
import { PanelBody, TextControl } from '@wordpress/components'; // UI components

class AbstractBlockExtension {
    #blockToExtend = '';
    #newControls = '';
    
    constructor() {
        if (new.target === AbstractBase) {
          throw new Error("Cannot instantiate AbstractBlockExtension directly.");
        }
    }

    init() {

    }

    addAttribute(settings, name) {
        let blockName = this.#blockToExtend;
        
        if(! blockName) {
            throw new Error("The name of the block you want to extend is not valid.");
        } else if(name !== blockName) {
            return settings;
        }

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                dataTrackingId: {
                    type: 'string',
                    default: '',
                },
            },
        };
    }

    addControls(BlockEdit) {
        <>
            {/* Render the default block editor UI */}
            <BlockEdit {...props} />
        </>
    }

    addProps() {

    }

    set setBlockToExtend(blockName) {
        this.#blockToExtend = blockName;
    }

    set setControls(newControls) {
        this.#newControls = newControls;
    }
}