# 🎓 LearnHooks

**LearnHooks** is a WordPress learning-oriented plugin designed to teach developers **how hooks work** in **PHP** and **JavaScript**, step by step.  

It’s built with **modern architecture**:  
- ✅ PSR‑4 autoloading (via Composer)  
- ✅ Namespaced classes  
- ✅ Design patterns (Template Method, Strategy)  
- ✅ Automatic hook registration via a Loader  
- ✅ JS powered by **@wordpress/scripts** for modern Gutenberg development

Each folder has its own `README.md` for focused learning.

---

## 📂 Repository

**GitHub Repo:** [LearnHooks on GitHub](https://github.com/laloptk/learnhooks)

---

## 🚀 Learning Journey

This plugin is structured as **progressive learning phases**:

1. **Phase 1: PHP Extensibility**
   - Learn **how PHP hooks work** (`add_action`, `add_filter`)
   - Explore **dynamic hooks** (`do_action("hook_{$id}")`)
   - See how to create **REST API routes** with reusable patterns
   - Understand **PSR‑4 autoloading & namespacing**
   - Study **HookableInterface + Loader pattern** for scalable hook registration

2. **Phase 2: JS Hook Fundamentals**
   - Learn **@wordpress/hooks** (`addAction`, `addFilter`)
   - Explore a minimal `enrollment.js` example

3. **Phase 3: Simple Gutenberg Extensibility**
   - Extend a core block (`core/button`) with a **single JS file**
   - Add new attributes + InspectorControls + frontend markup changes

4. **Phase 4: Advanced JS Extensibility**
   - Build an **AbstractBlockExtension** class using Template Method + Strategy
   - Extend any Gutenberg block easily
   - Add **custom JS hooks** for meta-extensibility

5. **Planned: Phase 5 – Introspection Mode**
   - Real-time debugging to see how hooks trigger & mutate data

---

## 🛠️ What’s Inside

### ✅ PHP Side (Phase 1)

All PHP code lives under `includes/`, organized with **PSR‑4 autoloading** and **namespaced classes**.

#### 1. Contracts (`includes/Contracts/HookableInterface.php`)
- Defines a **simple contract** for any hookable class (`register_hooks(): void`).
- Guarantees that the Loader can **automatically register hooks** for any class implementing it.

#### 2. Services

- **LearnHooksLoader (`includes/Services/LearnHooksLoader.php`)**
  - A **Service Loader pattern**
  - Instantiates all classes implementing `HookableInterface`
  - Calls their `register_hooks()` automatically

- **EnrollmentService (`includes/Services/EnrollmentService.php`)**
  - Handles **business logic** for enrolling users
  - Shows:
    - Defensive validation
    - `apply_filters('learninghooks/enrollment_data', $data)` to let devs modify enrollment info
    - Dynamic + generic actions:
      - `do_action("learninghooks/user_enrolled_{$courseId}")`
      - `do_action('learninghooks/user_enrolled')`

#### 3. Listeners

- **EnrollmentLogger (`includes/Listeners/EnrollmentLogger.php`)**
  - Hooks into the **dynamic + generic enrollment actions**
  - Logs events like:
    - `[Generic] User enrolled in any course`
    - `[Specific:123] User enrolled in course 123`

Shows how to **listen to dynamic hook names**.

#### 4. Routes

- **AbstractRoute (`includes/Routes/AbstractRoute.php`)**
  - **Template Method pattern**
  - Handles common REST route registration
  - Subclasses just define namespace, path, args, callback

- **EnrollmentRoute (`includes/Routes/EnrollmentRoute.php`)**
  - A concrete route for `/learninghooks/v1/enroll`
  - POST request with `user_id` + `course_id`
  - Uses `EnrollmentService` to trigger enrollment + hooks

✅ **This Phase teaches:**  
- PSR‑4 autoloading & namespaces  
- How to structure a modern plugin  
- How to register REST API routes with reusable patterns  
- How to build dynamic filters & actions  

---

### ✅ JS Side (Phase 2)

- **enrollment.js**
  - Minimal example of JS hooks (`addAction`, `addFilter`)
  - Shows how to attach and listen to JS events

✅ **This Phase teaches:**  
- The basics of **@wordpress/hooks**  
- Understanding hook signatures (filters must return a value)  

---

### ✅ JS Side (Phase 3)

- **extend-core-button.js**
  - Extends `core/button` Gutenberg block
  - Adds custom attributes
  - Shows extra sidebar controls (InspectorControls)
  - Modifies frontend markup

✅ **This Phase teaches:**  
- How Gutenberg uses **filters** (`blocks.registerBlockType`, `editor.BlockEdit`, `blocks.getSaveContent.extraProps`)  
- How to inject UI + props into core blocks  

---

### ✅ JS Side (Phase 4)

- **AbstractBlockExtension (`src/utils/AbstractBlockExtension.js`)**
  - Advanced extensibility layer
  - Uses **Template Method + Strategy Pattern**
  - Subclasses only need to:
    - Set a namespace
    - Set target block
    - Provide `InspectorControls`
    - Provide props modifiers

- **Custom JS hooks inside AbstractBlockExtension**
  - `learnhooks.beforeInit` / `afterInit`
  - `learnhooks.modifyAttributes`
  - `learnhooks.modifySaveProps`
  - `learnhooks.controlsRendered`

- **Concrete Classes (`src/extensions/`)**
  - Example: `ImageAltSourceExtension.js` (extends `core/image`)

✅ **This Phase teaches:**  
- How to build your own **extensible mini-framework**  
- How to make **your system hookable**, just like WordPress core  

---

## ✅ JS Build & Tooling

The JS part of this plugin uses **@wordpress/scripts**, which provides zero-config build tools for Gutenberg development.

### 📦 Commands

- **Initialize** (install all deps)  
  ```bash
  npm install
  ```

- **Start development mode (watch mode)**  
  ```bash
  npm run start
  ```

- **Build for production**  
  ```bash
  npm run build
  ```

When you run `start` or `build`, **@wordpress/scripts** compiles all JS in `src/` into a bundled file in `build/` which WordPress enqueues.

---

## 📖 Self-Documentation

Every folder has its own `README.md` explaining:  
- What the code does  
- Why it’s designed that way  
- How to try it  

This way you can explore **step by step**.

---

## 📂 Folder Structure Quick View

```
learnhooks/
  ├── includes/
  │   ├── Contracts/
  │   │   └── HookableInterface.php
  │   ├── Listeners/
  │   │   └── EnrollmentLogger.php
  │   ├── Routes/
  │   │   ├── AbstractRoute.php
  │   │   └── EnrollmentRoute.php
  │   ├── Services/
  │   │   ├── LearnHooksLoader.php
  │   │   └── EnrollmentService.php
  ├── src/
  │   ├── enrollment.js
  │   ├── extend-core-button.js
  │   ├── utils/AbstractBlockExtension.js
  │   ├── extensions/
  │   │   ├── block-extension-concrete-class-template.js
  │   │   └── ImageAltSourceExtension.js
  │   └── index.js
  ├── composer.json (PSR‑4 autoloader)
  ├── package.json (@wordpress/scripts setup)
  ├── README.md (this file)
```

---

## 🧑‍💻 How to Use This Repo

1. **Clone the repo**
   ```bash
   git clone https://github.com/laloptk/learnhooks.git
   cd learnhooks
   ```

2. **Install PHP autoloader**
   ```bash
   composer dump-autoload
   ```

3. **Install JS dependencies (@wordpress/scripts)**
   ```bash
   npm install
   ```

4. **Run in development mode**
   ```bash
   npm run start
   ```

5. **Or build for production**
   ```bash
   npm run build
   ```

6. **Activate the plugin in WordPress**
   - Copy it to `wp-content/plugins/`
   - Activate from WP Admin Plugins screen

7. **Explore step by step**
   - Try calling the REST route `/learninghooks/v1/enroll`
   - Watch PHP hooks trigger & log
   - Open block editor & explore JS hook examples

---

## 🎯 Who Is This For?

- WP developers wanting to **really understand hooks**  
- Anyone learning **modern PHP plugin architecture**  
- Gutenberg devs curious about **JS filters & block extensibility**  
- Developers who want to build **extensible systems**

---

## 🗺️ Roadmap

- ✅ Phase 1: PHP Extensibility (Contracts, Loader, Routes, Dynamic Hooks)
- ✅ Phase 2: JS hook fundamentals
- ✅ Phase 3: Simple Gutenberg block extension
- ✅ Phase 4: AbstractBlockExtension + meta-extensibility
- 🔜 Phase 5: Introspection Mode + Debug Panel
- 🔜 More PHP & JS hook examples

---

## ✨ Why This Matters

Hooks are the **core of WordPress extensibility**:
- They power Gutenberg
- They let plugins talk to each other
- They enable scalable, maintainable code

This plugin shows **step by step** how to:
- Use hooks in **PHP**
- Use hooks in **JS**
- Build your **own hookable mini-framework**

---

Happy learning! 🚀
