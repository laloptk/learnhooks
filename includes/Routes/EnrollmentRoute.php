<?php 

namespace LearnHooks\Routes;

use LearnHooks\Routes\AbstractRoute;
use LearnHooks\Services\EnrollmentService;
use WP_REST_Request;
use WP_REST_Response;

class EnrollmentRoute extends AbstractRoute {
    protected function get_route_namespace(): string {
        return 'learninghooks/v1';
    }

    protected function get_route(): string {
        return '/enroll';
    }

    protected function get_args(): array {
        return [
            'methods' => 'POST',
            'callback' => [$this, 'callback'],
            'permission_callback' => '__return_true', // Dev-only. Secure later.
            'args'                => [
                'user_id'    => [ 'required' => true, 'type' => 'integer' ],
                'course_id'  => [ 'required' => true, 'type' => 'integer' ],
            ],
        ];
    }

    public function callback(WP_REST_Request $request): WP_REST_Response {
        $user_id   = absint( $request->get_param( 'user_id' ) );
        $course_id = absint( $request->get_param( 'course_id' ) );
        $service = new EnrollmentService();
        $service->enroll_user($course_id, $user_id);
        
        return new WP_REST_Response([
            'success' => true,
            'message' => "User $user_id enrolled in course $course_id",
        ], 200);
    }
}