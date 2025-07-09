<?php

namespace LearnHooks\Routes;

use LearnHooks\Contracts\HookableInterface;
use WP_REST_Request;
use WP_REST_Response;

/**
 * AbstractRoute is a base class for creating REST API endpoints in WordPress.
 *
 * It follows the Template Method design pattern:
 * - The structure (registering hooks and routes) is defined here.
 * - The specifics (namespace, path, arguments, and callback logic) are left to child classes.
 *
 * This allows multiple route classes to share consistent behavior while customizing only what’s unique.
 *
 * Used in conjunction with HookableInterface to make it compatible with the plugin loader system.
 */
abstract class AbstractRoute implements HookableInterface {

    /**
     * Hook into 'rest_api_init' to register the route with WordPress.
     * This is triggered when the REST API is initialized.
     */
    public function register_hooks(): void {
        add_action('rest_api_init', [ $this, 'register_route' ]);
    }

    /**
     * Registers a REST API route by combining:
     * - A namespace (e.g., 'learninghooks/v1')
     * - A route path (e.g., '/enroll')
     * - An array of configuration arguments returned by the subclass
     *
     * These values are abstracted to allow flexibility across different route types.
     */
    public function register_route(): void {
        $route_namespace = $this->get_route_namespace();
        $route = $this->get_route();
        $args = $this->get_args();

        // The actual WordPress function that maps the route to its logic
        register_rest_route($route_namespace, $route, $args);
    }

    /**
     * Return the namespace string for the route.
     * Example: 'learninghooks/v1'
     */
    abstract protected function get_route_namespace(): string;

    /**
     * Return the route path.
     * Example: '/enroll'
     */
    abstract protected function get_route(): string;

    /**
     * Return an array of arguments that define how the route behaves.
     *
     * This array can include:
     * - 'methods': HTTP methods accepted (e.g., GET, POST)
     * - 'callback': function or method to execute when the route is hit
     * - 'permission_callback': who can access it (for now, public for testing)
     * - 'args': input parameter requirements and validation
     *
     * The 'args' key is important for validation. Example:
     * ```php
     * 'args' => [
     *     'user_id' => [ 'required' => true, 'type' => 'integer' ],
     *     'course_id' => [ 'required' => true, 'type' => 'integer' ]
     * ]
     * ```
     * These ensure the route only runs if the request includes valid `user_id` and `course_id` params.
     */
    abstract protected function get_args(): array;

    /**
     * The callback function that handles the request.
     *
     * The WP_REST_Request object is automatically passed by WordPress.
     * You can access request data like so:
     * - `$request->get_param('user_id')`
     * - `$request->get_param('course_id')`
     *
     * These map directly to the keys defined in `args`.
     *
     * This method must return a WP_REST_Response object (or array that WordPress will convert).
     */
    abstract public function callback(WP_REST_Request $request): WP_REST_Response;
}
