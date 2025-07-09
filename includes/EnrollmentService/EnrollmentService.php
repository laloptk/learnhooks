<?php

namespace LearnHooks\EnrollmentService;

defined( 'ABSPATH' ) || exit;

/**
 * Class EnrollmentService
 *
 * Handles the logic for enrolling a user in a course.
 * Uses dynamic actions and filters to allow developer customization.
 *
 * Pattern: Template Method — this class defines the enrollment steps and delegates extensible parts via hooks.
 */
class EnrollmentService {

	/**
	 * Main method to enroll a user in a course.
	 *
	 * @param int $course_id Course ID.
	 * @param int $user_id   User ID.
	 */
	public function enroll_user( int $course_id, int $user_id ): void {
		// Step 1: Validate raw input early (defensive)
		$course_id = absint( $course_id );
		$user_id   = absint( $user_id );

		if ( ! $course_id || ! $user_id ) {
			error_log( '[LearningHooks] Enrollment aborted: invalid course or user ID.' );
			return;
		}

		try {
			$this->validate_enrollment_ids( $course_id, $user_id );
		} catch ( \InvalidArgumentException $e ) {
			error_log( '[LearningHooks] ' . $e->getMessage() );
			return;
		}

		// Step 2: Build initial enrollment data array
		$data = $this->build_enrollment_data( $course_id, $user_id );

		/**
		 * Filters the enrollment data before it's used.
		 *
		 * Developers can add, override, or remove keys.
		 * Be cautious when overriding core values like user_id or course_id.
		 *
		 * @param array $data {
		 *     @type int    $user_id
		 *     @type int    $course_id
		 *     @type string $date
		 * }
		 */
		$data = apply_filters( 'learninghooks/enrollment_data', $data );

		// Step 3: Re-validate essential keys from filtered data
		$data['user_id']   = absint( $data['user_id'] ?? 0 );
		$data['course_id'] = absint( $data['course_id'] ?? 0 );

		if ( ! $data['user_id'] || ! $data['course_id'] ) {
			error_log( '[LearningHooks] Filtered data is missing valid user_id or course_id. Enrollment aborted.' );
			return;
		}

		// Step 4: Simulated save operations
		$this->add_user_to_course( $data );  // [SIMULATED]
		$this->add_course_to_user( $data );  // [SIMULATED]

		// Step 5: Fire extensibility hooks
		$this->fire_enrollment_hooks( $data );
	}

	/**
	 * Validates the original input values for enrollment.
	 *
	 * @throws \InvalidArgumentException
	 */
	protected function validate_enrollment_ids( int $course_id, int $user_id ): void {
		/*
        This is how the data should be validated to make sure $user_id is a valid user
        And $course_id exists as a course post type
        Uncomment the code if you registered a 'course' post type
        Anr you are using real users, otherwise it would throw an exception every time
        
        if ( ! get_userdata( $user_id ) ) {
			throw new \InvalidArgumentException( "Invalid user ID: {$user_id}" );
		}

		if ( get_post_type( $course_id ) !== 'course' ) {
			throw new \InvalidArgumentException( "Post ID {$course_id} is not a valid course." );
		}*/
	}

	/**
	 * Builds the data structure for enrollment.
	 */
	protected function build_enrollment_data( int $course_id, int $user_id ): array {
		return [
			'user_id'   => $user_id,
			'course_id' => $course_id,
			'date'      => current_time( 'mysql' ),
		];
	}

	/**
	 * Fires post-enrollment action hooks.
	 *
	 * One dynamic and one generic hook.
	 */
	protected function fire_enrollment_hooks( array $data ): void {
		/**
		 * Fires when a user enrolls in a specific course.
		 *
		 * @param array $data
		 */
		do_action( "learninghooks/user_enrolled_{$data['course_id']}", $data );

		/**
		 * Fires when any user enrolls in any course.
		 *
		 * @param array $data
		 */
		do_action( 'learninghooks/user_enrolled', $data );
	}

	/**
	 * [SIMULATED] Adds user to the course list.
	 */
	protected function add_user_to_course( array $data ): void {
		error_log( "[LearningHooks] [SIMULATED] User {$data['user_id']} added to course {$data['course_id']}" );
	}

	/**
	 * [SIMULATED] Adds course to user’s profile.
	 */
	protected function add_course_to_user( array $data ): void {
		error_log( "[LearningHooks] [SIMULATED] Course {$data['course_id']} added to user {$data['user_id']}" );
	}
}