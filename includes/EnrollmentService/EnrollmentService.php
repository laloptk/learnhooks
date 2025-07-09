<?php

namespace LearningHooks;

defined( 'ABSPATH' ) || exit;

/**
 * Class EnrollmentService
 *
 * Handles user enrollment into courses.
 *
 * Template Method Pattern: defines an overall algorithm (`enroll_user`)
 * and delegates specific responsibilities to protected methods.
 *
 * Defensive programming: validates all input and uses only filtered $data as source of truth.
 */
class EnrollmentService {

    /**
     * Main method: coordinates the entire enrollment process.
     *
     * @param int $course_id Course ID the user is enrolling in.
     * @param int $user_id   User ID who is enrolling.
     */
    public function enroll_user( int $course_id, int $user_id ): void {
        // Basic input hardening to avoid invalid dynamic hook names
        $course_id = absint( $course_id );
        $user_id   = absint( $user_id );

        if ( ! $course_id || ! $user_id ) {
            error_log( '[LearningHooks] Invalid enrollment: course_id or user_id missing or zero.' );
            return;
        }

        // Full validation to ensure user and course exist
        try {
            $this->validate_enrollment_ids( $course_id, $user_id );
        } catch ( \InvalidArgumentException $e ) {
            error_log( '[LearningHooks] ' . $e->getMessage() );
            return;
        }

        // 🔧 Step 1: Build base data
        $data = $this->build_enrollment_data( $course_id, $user_id );

        /**
         * Filter enrollment data before it is saved.
         *
         * Developers may modify the 'date' or add metadata.
         * Overriding user_id or course_id is possible but not recommended.
         *
         * @hook learninghooks/enrollment_data
         *
         * @param array $data {
         *     @type int    $user_id
         *     @type int    $course_id
         *     @type string $date
         * }
         *
         * @return array $data
         */
        $data = apply_filters( 'learninghooks/enrollment_data', $data );

        // Step 2: Save user to course and course to user (simulated)
        $this->add_user_to_course( $data );   // [SIMULATED]
        $this->add_course_to_user( $data );   // [SIMULATED]

        // Step 3: Notify other plugins via actions
        $this->fire_enrollment_hooks( $data );
    }

    /**
     * Constructs the enrollment data structure.
     *
     * @param int $course_id
     * @param int $user_id
     * @return array
     */
    protected function build_enrollment_data( int $course_id, int $user_id ): array {
        return [
            'user_id'   => $user_id,
            'course_id' => $course_id,
            'date'      => current_time( 'mysql' ),
        ];
    }

    /**
     * Validates that both user and course exist.
     * Throws exceptions on failure to fail fast.
     *
     * @param int $course_id
     * @param int $user_id
     * @throws \InvalidArgumentException
     */
    protected function validate_enrollment_ids( int $course_id, int $user_id ): void {
        if ( ! get_userdata( $user_id ) ) {
            throw new \InvalidArgumentException( "Enrollment failed: invalid user ID {$user_id}." );
        }

        if ( get_post_type( $course_id ) !== 'course' ) {
            throw new \InvalidArgumentException( "Enrollment failed: post ID {$course_id} is not a course." );
        }
    }

    /**
     * [SIMULATED] Adds user to course enrollment list.
     *
     * @param array $data
     */
    protected function add_user_to_course( array $data ): void {
        error_log( "[LearningHooks] [SIMULATED] User {$data['user_id']} added to course {$data['course_id']}" );
    }

    /**
     * [SIMULATED] Adds course to user profile/history.
     *
     * @param array $data
     */
    protected function add_course_to_user( array $data ): void {
        error_log( "[LearningHooks] [SIMULATED] Course {$data['course_id']} added to user {$data['user_id']}" );
    }

    /**
     * Fires both a general and a dynamic action hook after enrollment.
     *
     * Dynamic: allows course-specific listeners.
     * General: allows system-wide listeners.
     *
     * @param array $data
     */
    protected function fire_enrollment_hooks( array $data ): void {
        do_action( "learninghooks/user_enrolled_{$data['course_id']}", $data );
        do_action( 'learninghooks/user_enrolled', $data );
    }
}
