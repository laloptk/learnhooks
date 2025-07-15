/**
 * ======================================================
 * 1. IMPORTS
 * ======================================================
 */

// ✅ Always import the AbstractBlockExtension base class
import AbstractBlockExtension from '../path/to/AbstractBlockExtension';

// ✅ Import any Gutenberg UI components you need for your custom InspectorControls
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * ======================================================
 * 2. CLASS DEFINITION
 * ======================================================
 *
 * This concrete class extends the abstract base to:
 *  - Target a specific Gutenberg core block
 *  - Add new attributes
 *  - Inject custom sidebar controls
 *  - Modify the saved frontend HTML props
 *
 * The base class itself is **hookable** via custom WordPress JS hooks.
 * 
 * 🔹 Custom hooks available for LEARNING purposes:
 * 
 *    1. `learnhooks.shouldInitExtension` → allows filtering whether `init()` runs
 *       - Purpose: In real life, you might use this to disable an extension conditionally
 *       - Here: Added mainly to practice filters
 * 
 *    2. `learnhooks.beforeInit` & `learnhooks.afterInit` → actions before/after filter registration
 *       - Purpose: Rarely needed, but shows how to trigger lifecycle actions
 * 
 *    3. `learnhooks.modifyAttributes` → lets external code add/modify block attributes
 *       - Purpose: More realistic, external plugins sometimes add attributes dynamically
 * 
 *    4. `learnhooks.modifySaveProps` → lets external code modify saved frontend props
 *       - Purpose: Useful to test “meta-extensibility,” letting others tweak what you already changed
 * 
 *    5. `learnhooks.controlsRendered` → fires every time the custom controls render
 *       - Purpose: Debug/logging hook for learning, not common in production
 */

class MyCustomBlockExtension extends AbstractBlockExtension {

    /**
     * ----------------------------------------------
     * Constructor
     * ----------------------------------------------
     *
     * 1. Always call `super()` (it runs the abstract guard)
     * 2. Set:
     *    ✅ Namespace → unique string used for filter registration IDs
     *    ✅ Block name → which block to extend (e.g. 'core/paragraph')
     *    ✅ Controls → JSX function for sidebar UI
     *    ✅ Props modifier → function to modify frontend props
     *
     * Hooks triggered during the lifecycle:
     * 
     *  - `learnhooks.shouldInitExtension` fires BEFORE init to allow skipping registration
     *  - `learnhooks.beforeInit` fires if init proceeds
     *  - `learnhooks.afterInit` fires after all filters are registered
     */
    constructor() {
        super(); // ✅ required

        // ✅ Set a unique namespace for this extension (used in filter identifiers)
        this.setNamespace = 'paragraph-extra-settings';

        // ✅ Define which Gutenberg block this extension will modify
        this.setBlockToExtend = 'core/paragraph';

        /**
         * ✅ Define sidebar controls (InspectorControls)
         * 
         * - `props` includes block attributes, setAttributes(), isSelected, etc.
         * - Your UI will always appear ONLY for this block type
         * 
         * Hook note:
         *  - Every time these controls render, the base class will fire:
         *      `doAction('learnhooks.controlsRendered', namespace, props)`
         *    Mostly for learning/logging purposes.
         */
        this.setControls = (props) => {
            return (
                <InspectorControls>
                    <PanelBody title="Extra Paragraph Settings">
                        <TextControl
                            label="Custom ID"
                            value={props.attributes.customId || ''}
                            onChange={(val) =>
                                props.setAttributes({ customId: val })
                            }
                        />
                    </PanelBody>
                </InspectorControls>
            );
        };

        /**
         * ✅ Define how to modify saved frontend props
         * 
         * - `extraProps` are the current HTML props for the block wrapper (className, style, etc.)
         * - `attributes` are the block attributes (including your new ones)
         * 
         * Hook note:
         *  - After this runs, an external filter can still modify the final props:
         *      `applyFilters('learnhooks.modifySaveProps', props, blockName, attributes, namespace)`
         *    This lets *other* code tweak what you injected.
         */
        this.setPropsModifier = (extraProps, attributes) => {
            return {
                ...extraProps,
                'data-custom-id': attributes.customId || '',
            };
        };
    }
}

/**
 * ======================================================
 * 3. EXPORT
 * ======================================================
 */

// ✅ Export the class so it can be imported & initialized in src/index.js
export default MyCustomBlockExtension;
