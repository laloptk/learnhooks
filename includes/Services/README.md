# 🧠 LearningHooks – Enrollment Module

This directory contains the `EnrollmentService` class — a purpose-built learning resource focused on mastering **WordPress hooks** in real, maintainable plugin code.

---

## 🎯 Purpose

The goal of this module is to provide a **clean, testable, and extensible** example of how to:

- Define **custom actions and filters**
- Use **dynamic hooks** responsibly
- Sanitize and validate **filtered output**
- Fire hooks at the right points in a process
- Implement **defensive programming** when exposing extensibility points
- Apply key **software engineering principles** (like YAGNI, DRY, and SOLID)
- Use the **Template Method design pattern** to structure domain logic

---

## 📦 Contents

| File                         | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| `EnrollmentService.php`      | Core logic class that handles enrolling a user into a course               |
| `README.md`                  | This document — explains the goals and decisions behind the code           |

---

## 🔧 What the Code Does

- Validates incoming data (`user_id`, `course_id`)
- Builds a structured `$data` array for enrollment
- Fires a **filter hook** before saving data:
  ```php
  apply_filters( 'learninghooks/enrollment_data', $data );
  ```
- Re-validates critical values after the filter (defensive coding)
- Calls two **custom actions**:
  - One generic: `learninghooks/user_enrolled`
  - One dynamic: `learninghooks/user_enrolled_{course_id}`
- Simulates two write operations (user → course, course → user)
- Avoids instantiating unless explicitly called (separation of concerns)

---

## 🧱 Design Pattern

This class follows the **Template Method** pattern:

> A method (`enroll_user()`) defines the overall structure of the operation.  
> Specific steps (`validate_enrollment_ids()`, `build_enrollment_data()`, `fire_enrollment_hooks()`) are broken out into their own methods for clarity, reuse, and testability.

---

## 🧠 Engineering Principles Applied

| Principle   | Application Example |
|------------|----------------------|
| **YAGNI**  | No extra parameters or features are added unless needed |
| **DRY**    | Reuse of methods like `build_enrollment_data()` and `fire_enrollment_hooks()` |
| **SOLID**  | Follows Single Responsibility Principle: class only handles enrollment |
| **Defensive Programming** | Validates data before and after filters to prevent misuse |
| **Open/Closed Principle** | Other developers can extend behavior via hooks without modifying the class |

---

## ❗ Developer Notes

- The hooks exposed here are **entry points** for other plugin classes (like loggers, notifiers, etc.).
- The `EnrollmentService` itself is **not loaded automatically** — it should be called explicitly from a REST route, form handler, or CLI.
- This module is intentionally **simple** to highlight **hook mechanics**, not business logic.

---

## 📚 Further Reading

- [WordPress Developer Docs – Hooks](https://developer.wordpress.org/plugins/hooks/)
- [WordPress Lesson: Developing with Hooks](https://learn.wordpress.org/lesson/developing-with-hooks/)
- [Template Method Pattern – Refactoring Guru](https://refactoring.guru/design-patterns/template-method)
- [OOP Principles – SOLID](https://en.wikipedia.org/wiki/SOLID)

---

## ✅ Status

This module is part of the **LearningHooks** plugin, but can be studied and reused independently.  
It provides a clean, minimal, real-world use case to understand **where and how hooks are applied** in modern WordPress code.