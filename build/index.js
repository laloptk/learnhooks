/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/enrollment.js":
/*!***************************!*\
  !*** ./src/enrollment.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);


// This is the default enrollment message generator
function displayEnrollment(userId, courseId) {
  const message = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.applyFilters)('learnhooks.modifyEnrollmentMessage',
  // Hook name
  `User ${userId} enrolled in course ${courseId}`,
  // Default message
  userId, courseId);
  console.log(message);
}

// Simulate another script adding a filter to modify the message
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('learnhooks.modifyEnrollmentMessage',
// Hook name (same as applyFilters)
'my-plugin/emoji-modifier',
// Unique namespace
(message, userId, courseId) => {
  return `${message} 🎉`;
});

// Trigger the enrollment logic
displayEnrollment(101, 42);

/***/ }),

/***/ "./src/extend-core-button.js":
/*!***********************************!*\
  !*** ./src/extend-core-button.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
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

 // Hook into Gutenberg filters
 // Sidebar controls
 // UI components
 // React fragment wrapper

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
        default: ''
      }
    }
  };
};
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType',
// Filter called during block registration
'learnhooks/add-button-tracking-attr',
// Unique namespace for this modification
addCustomAttribute);

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
const ButtonTrackingControls = BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      setAttributes
    } = props;

    // Only target core/button
    if (name !== 'core/button') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      dataTrackingId
    } = attributes;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Tracking ID",
          initialOpen: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "Data Tracking ID",
            help: "This will be added as a data-tracking-id attribute in the frontend.",
            value: dataTrackingId || '',
            onChange: val => setAttributes({
              dataTrackingId: val
            })
          })
        })
      })]
    });
  };
};
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockEdit',
// Filter that lets us wrap the block edit UI
'learnhooks/button-tracking-controls',
// Namespace
ButtonTrackingControls // Our plain function
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
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.getSaveContent.extraProps',
// Filter before saving block markup
'learnhooks/save-button-tracking-attr',
// Namespace
saveCustomAttribute);

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extend_core_button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend-core-button.js */ "./src/extend-core-button.js");
/* harmony import */ var _enrollment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enrollment.js */ "./src/enrollment.js");
// ✅ Include procedural block extensions


})();

/******/ })()
;
//# sourceMappingURL=index.js.map