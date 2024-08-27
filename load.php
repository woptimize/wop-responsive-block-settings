<?php
/**
 * Plugin Name:       Responsive Block Settings
 * Plugin URI:        https://www.woptimize.io
 * Description:       Add responsive settings to all WordPress blocks. Hide any block on mobile, tablet or desktop; stack, reverse, or set custom order for inner blocks in groups and columns; change the mobile menu breakpoint.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Stefano Ginella, woptimize.io
 * Author URI:        https://www.stefanoginella.com
 * License:           GPLv2 or later.
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wop-rbs
 *
 * @package wop-responsive-block-settings
 *
 */

// Abort if accessing the file directly
defined( 'ABSPATH' ) || exit;

// Define useful constants
define( 'WOP_RBS_URL', plugin_dir_url( __FILE__ ) );
define( 'WOP_RBS_DIR', plugin_dir_path( __FILE__ ) );
$plugin_data = get_file_data( __FILE__, array( 'Version' => 'Version' ) );
define( 'WOP_RBS_VER', $plugin_data['Version'] );

// Includes
$includes = [
	'render-block',
	'scripts'
];
foreach ( $includes as $include ) {
	require_once( "inc/$include.php" );
}
