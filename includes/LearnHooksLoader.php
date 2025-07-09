<?php

namespace LearnHooks;

use LearnHooks\Contracts\HookableInterface;
use LearnHooks\Listeners\EnrollmentLogger;
use LearnHooks\Routes\EnrollmentRoute;

defined( 'ABSPATH' ) || exit;

/**
 * Class Loader
 *
 * Loads and registers all hookable classes in the plugin.
 */
class LearnHooksLoader {

	/**
	 * Initialize the plugin.
	 */
	public function __construct() {
		$this->register_services();
	}

	/**
	 * Instantiates and registers all hookable classes.
	 */
	protected function register_services(): void {
		$services = [
			EnrollmentLogger::class,
            EnrollmentRoute::class,
			// Add more classes here as you build them
		];

		foreach ( $services as $service_class ) {
			$instance = new $service_class();

			if ( $instance instanceof HookableInterface ) {
				$instance->register_hooks();
			}
		}
	}
}
