import { addAction, addFilter } from '@wordpress/hooks';

// ✅ Action BEFORE init
addAction(
    'learnhooks.beforeInit',
    'learnhooks/try-before-init',
    (namespace, blockToExtend) => { 
        console.log(
            `About to initialize the init process for ${blockToExtend} with the namespace of ${namespace}`
        );
    }
);

// ✅ FILTER: must always return a value!
addFilter(
    'learnhooks.modifyAttributes',
    'learnhooks/try-modifier',
    (modifier, name, namespace) => {
        console.log(
            `The modifier was applied to ${name} with the namespace of ${namespace}`
        );

        // ✅ Always return the modified or original settings
        return modifier;
    }
);

// ✅ Action BEFORE rendering controls
addAction(
    'learnhooks.controlsRendered',
    'learnhooks/try-hook-before-rendering-controls',
    (namespace, props) => {
        console.log('Action triggered before rendering the combined/modified controls.');
    }
);

// ✅ Filter BEFORE saving props for HTML attribute in front-end
addFilter(
    'learnhooks.modifySaveProps', 
    'learnhooks/try-modified-props',
    (modifiedProps, blockName, attributes, namespace) => {
        console.log('Run this filter before saving the props that will show as HTML attributes in the front-end.');
        return modifiedProps
    }
)

// ✅ Action AFTER init
addAction(
    'learnhooks.afterInit',
    'learnhooks/try-after-init',
    (namespace, blockToExtend) => { 
        console.log(
            `The init process finished for ${blockToExtend}`
        );
    }
);