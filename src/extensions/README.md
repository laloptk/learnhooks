This folder contains **concrete block extension classes** that extend the reusable **`AbstractBlockExtension`**.  

The **goal** of these classes is to help you:  
✅ Learn how to **extend Gutenberg core blocks**  
✅ Practice **WordPress JS hooks** (`addFilter`, `addAction`, `applyFilters`, `doAction`)  
✅ Understand **block lifecycle points** (attributes → editor controls → frontend props)  
✅ Explore how **meta-extensibility** works (extending your own extension system)  

---

## 🏗️ Architecture Overview  

### 1. **Abstract Class**  

- **Location:** `src/utils/AbstractBlockExtension.js`  
- **Purpose:** Provides a **base reusable class** that:  
  - Registers Gutenberg filters for:
    - Adding custom attributes
    - Injecting InspectorControls
    - Modifying saved frontend props
  - Defines a clean API for subclasses:
    - `setNamespace` → unique filter namespace
    - `setBlockToExtend` → target block name (`core/paragraph`, etc.)
    - `setControls` → function returning custom sidebar JSX
    - `setProps` → function modifying frontend saved props
  - Adds **custom JS hooks** internally for learning meta-extensibility  

This class **cannot** be instantiated directly — subclasses must extend it.

---

### 2. **Concrete Classes**

- **Location:** `src/extensions/`  
- **Purpose:** Target a **specific Gutenberg block**, providing:  
  - Which block to extend  
  - Which extra attributes to add  
  - Which custom controls to show in the sidebar  
  - How to modify frontend HTML props  

Concrete classes only configure these values—**all the heavy lifting is done by the abstract class.**

---

## 📝 The Provided Template  

To help you create a new concrete class easily, we’ve prepared a template:  

- **Template location:**  
  `src/extensions/block-extension-concrete-class-template.js`  

- **What it contains:**  
  - Pre-written structure for extending `AbstractBlockExtension`  
  - Inline **comments explaining what to configure**  
  - Documentation of which **custom hooks** will fire and why  
  - Examples of `setControls` (for sidebar UI) and `setPropsModifier` (for frontend props)

You can copy this template, rename it, and update it for your target block.

---

## 🎯 Learning Goals  

By creating concrete classes, you’ll:  

1. **Understand Gutenberg filters**  
   - `blocks.registerBlockType` → add custom attributes  
   - `editor.BlockEdit` → inject controls  
   - `blocks.getSaveContent.extraProps` → modify frontend props  

2. **Learn custom JS hooks in WordPress**  
   - How to `applyFilters` and `doAction`  
   - How to hook into your own system for meta-extensibility  

3. **Practice extending core blocks**  
   - Each concrete class targets one Gutenberg block (`core/paragraph`, `core/button`, etc.)  
   - Each extension provides unique attributes + UI + frontend behavior  

---

## 🔌 Custom Hooks Built Into the Base Class  

The abstract class triggers **custom JS hooks** to make the extension system itself **hookable**.  

### Lifecycle Hooks  

| Hook | Type | When it fires | Why it exists |
|------|------|---------------|---------------|
| `learnhooks.shouldInitExtension` | **Filter** | Before `init()` registers any filters | Lets you skip init for a specific extension |
| `learnhooks.beforeInit` | **Action** | Just before registering filters | Mostly for learning (rarely needed in prod) |
| `learnhooks.afterInit` | **Action** | After all Gutenberg filters are registered | Useful for debugging/logging |

### Attribute Hooks  

| Hook | Type | When it fires | Why it exists |
|------|------|---------------|---------------|
| `learnhooks.modifyAttributes` | **Filter** | After merging new attributes | Allows external code to inject more attributes dynamically |

### Frontend Props Hooks  

| Hook | Type | When it fires | Why it exists |
|------|------|---------------|---------------|
| `learnhooks.modifySaveProps` | **Filter** | After your `setPropsModifier` runs | Lets other code tweak what you already changed |

### UI Hooks  

| Hook | Type | When it fires | Why it exists |
|------|------|---------------|---------------|
| `learnhooks.controlsRendered` | **Action** | Whenever the custom InspectorControls render | Added mainly for learning/logging purposes |

These hooks show how **filters/actions** can make *your own* extension system extensible—just like Gutenberg does.

---

## 🚀 How to Create a New Concrete Class  

1. **Copy the template**:  
   ```bash
   cp src/extensions/block-extension-concrete-class-template.js src/extensions/MyBlockExtension.js
   ```

2. **Update your new class**:  
   - Change `setNamespace` to a unique name  
   - Change `setBlockToExtend` to the block you want to target  
   - Define `setControls` → return JSX for InspectorControls  
   - Define `setPropsModifier` → modify saved frontend props  

3. **Register your class in `src/index.js`**:  
   ```js
   import MyBlockExtension from './extensions/MyBlockExtension';

   const myExt = new MyBlockExtension();
   myExt.init(); // explicitly register all hooks
   ```

4. **Optional: Experiment with the custom hooks** in `src/index.js`:  
   ```js
   import { addFilter, addAction } from '@wordpress/hooks';

   // Disable an extension dynamically
   addFilter('learnhooks.shouldInitExtension', 'demo/disable-paragraph', (shouldInit, namespace, blockName) => {
       if (blockName === 'core/paragraph') return false;
       return shouldInit;
   });

   // Log whenever controls are rendered
   addAction('learnhooks.controlsRendered', 'demo/log-render', (namespace, props) => {
       console.log(`[LOG] Controls rendered for ${namespace}`, props);
   });
   ```

---

## 📂 File Structure Quick Reference  

```
src/
  utils/
    AbstractBlockExtension.js      <-- Base reusable class (DO NOT INSTANTIATE)
  extensions/
    block-extension-concrete-class-template.js  <-- Copy this to create new extensions
    ParagraphExtension.js          <-- Example: concrete class for core/paragraph
    ButtonExtension.js             <-- Example: concrete class for core/button
  index.js                         <-- Entry file: instantiate and init extensions
```

---

## ✅ Why this approach is great for learning  

- You’ll see **real Gutenberg extensibility points** in action.  
- You’ll understand **how Core uses filters** to modify behavior.  
- You’ll practice **creating and consuming your own hooks**, mimicking how WordPress Core is built.  
- You’ll build a **clear mental model** of block lifecycle:
  - Register → Attributes → Editor Controls → Save Props → Frontend Output.

---

### Next Step  

- **Create your first concrete class** by copying the template.  
- Play with the **custom hooks** to see how meta-extensibility works.  
- Then move on to extending another core block to reinforce the pattern.
