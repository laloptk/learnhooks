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

add_action( 'admin_enqueue_scripts', function () {
	wp_enqueue_script(
		'learnhooks-enrollment',
		plugins_url( 'build/index.js', __FILE__ ),
		['wp-hooks'],
		filemtime( plugin_dir_path( __FILE__ ) . 'src/enrollment.js' ),
		true // in footer
	);
} );