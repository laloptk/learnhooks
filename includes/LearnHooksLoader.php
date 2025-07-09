<?php 

namespace LearnHooks;
// Singleton class that serves as a hook registrar
class LearnHooksLoader {
    
    // Singletons must have a protected constructor
    public function __construct() {
        
    }

    public static function register() {
        self::$instance = new self(); // Keep the instance to be able to deregister
        // WP Core PHP hooks go here
		add_action( 'admin_notices', [ self::$instance, 'admin_notice' ] );

		// Example filter
		add_filter( 'learninghooks/slogan', [ self::$instance, 'default_slogan' ] );
    }

    public function admin_notice(): void {
		echo '<div class="notice notice-info"><p>LearningHooks plugin initialized.</p></div>';
	}

	public function default_slogan( string $slogan ): string {
		return $slogan . ' — filtered by LearningHooks';
	}

    public static function deregister() {
        if ( self::$instance ) {
            remove_action( 'hook_name', [ self::$instance, 'method_name' ] );
        }
    }
}

