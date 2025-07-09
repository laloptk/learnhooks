# 🧠 LearningHooks – Listeners Module

This directory contains listener classes that hook into custom plugin events.  
These classes are meant to **observe** actions or filters fired elsewhere in the plugin — especially in service classes like `EnrollmentService`.

---

## 🎯 Purpose

The goal of this module is to teach how to:

- Write clean, decoupled classes that respond to WordPress hooks
- Use the **Observer pattern** in plugin architecture
- Avoid tightly coupling business logic and hook behavior
- Leverage interfaces to organize and register hookable components

---

## 📦 Contents

| File                      | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `EnrollmentLogger.php`    | Logs user enrollments using WordPress custom hooks                         |
| `README.md`               | This document — explains the architectural approach and purpose            |

---

## 🧱 Design Pattern: Observer

Each listener class implements the `HookableInterface`:

```php
interface HookableInterface {
    public function register_hooks(): void;
}
```

This ensures consistency and lets the plugin's loader automatically find and register these listeners.

The loader dynamically instantiates all hookable classes and calls their `register_hooks()` method, allowing the listeners to attach to filters and actions.

---

## 🔧 Example: `EnrollmentLogger`

This listener:

- Hooks into `learninghooks/user_enrolled` (generic)
- Hooks into `learninghooks/user_enrolled_123` (specific, dynamic)
- Logs enrollment activity using `error_log()`
- Can be replaced or extended in real-world code to write to a database, external service, or audit system

---

## 💡 Best Practices Demonstrated

- Use **public methods** when hooking (WordPress can't call protected/private)
- Sanitize dynamic hook names **before using them**
- Keep listener logic minimal — they should only react, not decide
- Group listener classes into folders and load them via a **loader pattern**

---

## 📚 Further Reading

- [WordPress Plugin API: Actions](https://developer.wordpress.org/plugins/hooks/actions/)
- [Design Patterns: Observer – Refactoring Guru](https://refactoring.guru/design-patterns/observer)
- [Interface Segregation Principle – SOLID](https://en.wikipedia.org/wiki/Interface_segregation_principle)

---

## ✅ Status

This directory is part of the **LearningHooks** plugin — a sandbox to explore WordPress extensibility through real, modular hook-based architecture.  
The code here is intentionally simple to highlight extensibility concepts and plugin architecture principles.