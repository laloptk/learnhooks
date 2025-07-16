import AbstractBlockExtension from '../utils/AbstractBlockExtension';
import { InspectorControls } from '@wordpress/block-editor'; // Sidebar controls
import { PanelBody, TextControl } from '@wordpress/components'; // UI components

class ImageBlockExtension extends AbstractBlockExtension {
    constructor() {
        super();

        this.setNamespace = 'image-alt-source';

        this.setBlockToExtend = 'core/image';

        this.setControls = (props) => {
            return (
                <InspectorControls>
                    <PanelBody>
                        <TextControl 
                            label="Custom Alt Attribute"
                            value={props.attributes.customAlt || ''}
                            onChange={(val) =>
                                props.setAttributes({ customAlt: val })
                            }
                            __next40pxDefaultSize={true}
                            __nextHasNoMarginBottom={true}
                        />
                    </PanelBody>
                </InspectorControls>
            )
        };

        this.setPropsModifier = (extraProps, attributes) => {
            return {
                ...extraProps,
                'data-alt-source': attributes.customAlt || ''
            }
        };
    }
}

export default ImageBlockExtension;