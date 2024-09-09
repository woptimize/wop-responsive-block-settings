<?php
/**
 * Plugin Name:       Responsive Block Settings
 * Plugin URI:        https://www.woptimize.io
 * Description:       Easily add responsive settings to all WordPress blocks, and customize the mobile menu breakpoint.
 * Version:           1.0.1
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Stefano Ginella, woptimize.io
 * Author URI:        https://www.stefanoginella.com
 * License:           GPLv2 or later.
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wop-responsive-block-settings
 *
 * @package wop-responsive-block-settings
 *
 */

// Abort if accessing the file directly.
defined( 'ABSPATH' ) || exit;


// To detect plugin also in the frontend.
include_once ABSPATH . 'wp-admin/includes/plugin.php';
// Load this plugin only if Woptimize is not active.
if ( ! is_plugin_active( 'woptimize/woptimize.php' ) ) {

	// Define useful constants.
	define( 'WOP_RBS_URL', plugin_dir_url( __FILE__ ) );
	define( 'WOP_RBS_DIR', plugin_dir_path( __FILE__ ) );
	$plugin_data = get_file_data( __FILE__, array( 'Version' => 'Version' ) );
	define( 'WOP_RBS_VER', $plugin_data[ 'Version' ] );

	// Includes.
	$includes = [
		'render-block',
		'rest-api',
		'scripts',
	];
	foreach ( $includes as $include ) {
		require_once( WOP_RBS_DIR . "includes/$include.php" );
	}
}



/**
 * Display an admin notice if Woptimize is installed.
 * The Responsive Block Settings plugin is not necessary if Woptimize is active.
 *
 * @return void
 */
function wop_plugin_notice() {
    if ( is_plugin_active( 'woptimize/woptimize.php' ) ) { ?>
        <div class="notice notice-info">
            <p>Please, to avoid possible conflicts deactivate and uninstall <strong>Responsive Block Settings</strong>. The same functionalitites are provided by <strong>Woptimize</strong>. Go to the <a href="<?php echo admin_url('plugins.php') ?>">Plugins page</a> to deactivate it.</p>
			<p><?php printf(
				__( 'Please, to avoid possible conflicts deactivate and uninstall <strong>Responsive Block Settings</strong>. The same functionalities are provided by <strong>Woptimize</strong>. Go to the <a href="%s">Plugins page</a> to deactivate it.', 'wop-responsive-block-settings' ),
				esc_url( admin_url( 'plugins.php' ) )
			); ?></p>
        </div>
    <?php
    }
}
add_action( 'admin_notices', 'wop_plugin_notice' );
