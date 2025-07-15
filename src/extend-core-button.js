/**
 * LearnHooks: Modern Gutenberg Extension Example
 *
 * Extend the core/button block with:
 * - A new "dataTrackingId" attribute
 * - A sidebar control to edit it
 * - Output of the attribute in the frontend HTML
 *
 * Same behavior as the HOC version, but written as a plain functional component.
 */

import { addFilter } from '@wordpress/hooks'; // Hook into Gutenberg filters
import { InspectorControls } from '@wordpress/block-editor'; // Sidebar controls
import { PanelBody, TextControl } from '@wordpress/components'; // UI components
import { Fragment } from '@wordpress/element'; // React fragment wrapper

/**
 * STEP 1: Add a new attribute to core/button
 *
 * This runs *before* Gutenberg finishes registering the block.
 * It lets us inject new attributes into the block schema.
 *
 * - If the block name is `core/button`, append `dataTrackingId`
 * - Otherwise, leave it untouched
 */
const addCustomAttribute = (settings, name) => {
    if (name !== 'core/button') return settings;

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
};

addFilter(
    'blocks.registerBlockType',             // Filter called during block registration
    'learnhooks/add-button-tracking-attr', // Unique namespace for this modification
    addCustomAttribute
);

/**
 * STEP 2: Add a custom sidebar control
 *
 * Normally, Gutenberg renders a default BlockEdit component.
 * We can hook into `editor.BlockEdit` and wrap it with our own UI.
 *
 * Instead of a HOC, we just write a **plain functional component**:
 *
 * - Checks if the current block is core/button
 * - If not, returns the original BlockEdit unchanged
 * - If yes:
 *    → Renders the original BlockEdit
 *    → Adds an InspectorControls panel with a TextControl
 */
const ButtonTrackingControls = (BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes } = props;

        // Only target core/button
        if (name !== 'core/button') {
            return <BlockEdit {...props} />;
        }

        const { dataTrackingId } = attributes;

        return (
            <Fragment>
                {/* Render the default block editor UI */}
                <BlockEdit {...props} />

                {/* Add our sidebar control */}
                <InspectorControls>
                    <PanelBody title="Tracking ID" initialOpen={false}>
                        <TextControl
                            label="Data Tracking ID"
                            help="This will be added as a data-tracking-id attribute in the frontend."
                            value={dataTrackingId || ''}
                            onChange={(val) => setAttributes({ dataTrackingId: val })}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
};

addFilter(
    'editor.BlockEdit',                     // Filter that lets us wrap the block edit UI
    'learnhooks/button-tracking-controls', // Namespace
    ButtonTrackingControls                 // Our plain function
);

/**
 * STEP 3: Modify the saved content
 *
 * When the block is saved, Gutenberg generates static HTML.
 * Without this step, the new attribute wouldn’t appear in the frontend.
 *
 * - Runs for each block before final markup is generated
 * - If the block is core/button, we inject `data-tracking-id`
 */
const saveCustomAttribute = (extraProps, blockType, attributes) => {
    if (blockType.name !== 'core/button') return extraProps;

    if (attributes.dataTrackingId) {
        extraProps['data-tracking-id'] = attributes.dataTrackingId;
    }

    return extraProps;
};

addFilter(
    'blocks.getSaveContent.extraProps',    // Filter before saving block markup
    'learnhooks/save-button-tracking-attr', // Namespace
    saveCustomAttribute
);
