<?php 

/*
 * Plugin Name: LearnHooks
 * text-domain: learnhooks
 */

defined('ABSPATH') || exit;

require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';

use LearnHooks\LearnHooksLoader;

add_action( 'plugins_loaded', function() {
	new LearnHooksLoader();
} );

/* This action trigger is for testing pouposes only
add_action( 'init', function () {
	if ( isset( $_GET['test_enroll'] ) ) {
		$enroller = new EnrollmentService();
		$enroller->enroll_user( 123, get_current_user_id() );
	}
} );*/

add_action( 'rest_api_init', function () {
    register_rest_route( 'test/v1', '/ping', [
        'methods' => 'GET',
        'callback' => function () {
            return rest_ensure_response([ 'pong' => true ]);
        },
    ]);
});