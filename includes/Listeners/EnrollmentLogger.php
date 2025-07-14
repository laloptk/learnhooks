<?php

namespace LearnHooks\Listeners;

use LearnHooks\Contracts\HookableInterface;

class EnrollmentLogger implements HookableInterface {

    public function register_hooks(): void {
        // Generic enrollment hook (fires on any enrollment)
        add_action( 'learninghooks/user_enrolled', [ $this, 'log_generic_enrollment' ] );

        // Specific course enrollment hook (example: course ID 123)
        add_action( 'learninghooks/user_enrolled_123', [ $this, 'log_specific_enrollment' ] );
    }

    /**
     * Logs all user enrollments (generic hook).
     *
     * @param array $data
     */
    public function log_generic_enrollment( array $data ): void {
        error_log( "[LearningHooks] [Generic] Send notification that user {$data['user_id']} was enrolled in {$data['course_id']}" );
    }

    /**
     * Logs only enrollments to course ID 123.
     *
     * @param array $data
     */
    public function log_specific_enrollment( array $data ): void {
        error_log( "[LearningHooks] [Specific:123] User {$data['user_id']} enrolled in course {$data['course_id']} from Logger" );
    }
}