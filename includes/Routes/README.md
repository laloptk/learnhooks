# 📘 Routes – REST API Endpoint for Enrollment

This folder contains the REST API route logic for the **LearningHooks** plugin.

It provides a hands-on learning example of how to build WordPress REST API routes using modern, object-oriented practices. The goal is to show how to trigger internal WordPress hooks (actions/filters) from an external event (like a POST request), while applying sound architecture principles.

---

## 🧱 What’s Inside

| File | Description |
|------|-------------|
| `AbstractRoute.php` | An abstract base class using the Template Method pattern. Provides a shared structure for defining and registering REST API routes. |
| `EnrollmentRoute.php` | A concrete implementation of a REST API route that allows enrolling a user into a course. Calls `EnrollmentService` which triggers WordPress hooks. |

---

## ✨ Key Concepts

### `AbstractRoute` Highlights

| Concept | Explanation |
|--------|-------------|
| **Template Method pattern** | The `register_hooks()` and `register_route()` logic is fixed. The subclass only needs to implement `get_route_namespace()`, `get_route()`, `get_args()`, and `callback()`. |
| **HookableInterface** | Ensures the route class integrates with the plugin's loader system. |
| **REST Route Registration** | Uses `register_rest_route()` with dynamic configuration from the subclass. |
| **Validation via `args`** | Defines expected request parameters and their types, enforced by WordPress. |

### `EnrollmentRoute` Highlights

| Concept | Explanation |
|--------|-------------|
| **Namespace** | `/wp-json/learninghooks/v1/enroll` is the final REST endpoint path. |
| **POST Method** | Accepts data to enroll a user, not for public GET access. |
| **Request Arguments** | Validates `user_id` and `course_id` before processing. |
| **WP_REST_Request Usage** | Pulls sanitized data using `$request->get_param('key')`. |
| **WP_REST_Response** | Returns a success response in JSON format. |
| **Delegation** | This class does not handle enrollment directly—it passes it to `EnrollmentService`, which fires hooks. |

---

## 🔁 Why This Matters

This module illustrates how external events (REST calls) can trigger internal WordPress logic using **hooks**. The REST API is often the bridge between your plugin and external systems (JavaScript apps, mobile, other services), and this example helps you connect that bridge cleanly.

It also reinforces good practices like:

- Defensive coding (`absint()`)
- SOLID principles (Single Responsibility, Open/Closed)
- Design patterns (Template Method, Strategy)
- YAGNI (not overbuilding unless needed)

---

## ✅ Learning Reminders

### AbstractRoute

| Concept | Key Point |
|--------|-----------|
| **REST API namespace** | Defines a versioned prefix for your endpoint (e.g., `v1`) |
| **`args` array** | Adds request-level validation (type, required fields) |
| **WP_REST_Request** | Automatically passed to your callback by WordPress |
| **Template Method pattern** | Keeps registration logic in the abstract class |
| **Strategy pattern** | Each route provides its own config + logic via method overrides |
| **Hook usage** | This route triggers a class (`EnrollmentService`) that fires WordPress hooks |

### EnrollmentRoute

| Concept | Key Point |
|--------|-----------|
| **REST API endpoint** | POST request to `/wp-json/learninghooks/v1/enroll` |
| **Route validation** | `user_id` and `course_id` must be integers and are required |
| **Service orchestration** | Does not do the logic itself — delegates to the Service layer |
| **Focus** | This class exists primarily to **trigger internal hooks** via REST |
| **Modular** | You can copy this pattern to create `/unenroll`, `/register`, etc. |

---

## 🧪 Next Steps

- Test this route using Postman, curl, or a simple JS `fetch()` in the admin panel.
- Explore how to secure the `permission_callback` properly.
- Consider creating a frontend interface that uses this route dynamically.