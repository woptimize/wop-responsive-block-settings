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
 * Text Domain:       responsive-block-settings
 *
 * @package responsive-block-settings
 *
 */

// Abort if accessing the file directly
defined( 'ABSPATH' ) || exit;

// Define useful constants
define( 'WOP_RBS_URL', plugin_dir_url( __FILE__ ) );
define( 'WOP_RBS_DIR', plugin_dir_path( __FILE__ ) );
define( 'WOP_RBS_VER', '1.0.1' );

// Includes
$includes = [
	'render-block',
	'rest-api',
	'scripts',
];
foreach ( $includes as $include ) {
	require_once( WOP_RBS_DIR . "includes/$include.php" );
}
