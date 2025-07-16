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

add_action( 'enqueue_block_editor_assets', 'learnhooks_enqueue_editor_assets' );

function learnhooks_enqueue_editor_assets() {
    wp_enqueue_script(
        'learnhooks-editor', // Handle
        plugins_url( 'build/index.js', __FILE__ ), // Path to compiled JS
        [ 
            'wp-blocks', 
            'wp-i18n', 
            'wp-element', 
            'wp-editor', 
            'wp-components', 
            'wp-compose', 
            'wp-hooks', 
        ], 
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ), // Cache-bust
        true // Load in footer
    );
}

