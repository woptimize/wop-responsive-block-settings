<?php
/**
 * Conditionally renders each block based on its visibility settings.
 *
 * @package wop-responsive-block-settings
 *
 * @since   1.0.0
 */

namespace Woptimize\Rbs\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Enqueues custom assets for the block editor only.
 *
 * @since   1.0.0
 *
 * @return void
 */
function block_editor_assets() {

	$asset = include ( WOP_RBS_DIR . 'build/wop-rbs-editor.asset.php'  );
    wp_enqueue_script(
		'wop-rbs-editor',
		WOP_RBS_URL . 'build/wop-rbs-editor.js',
		$asset['dependencies'],
		$asset['version'],
        true
    );
}
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\block_editor_assets');


/**
 * Enqueues custom assets for both the public-facing site and the block editor.
 *
 * @since   1.0.0
 *
 * @return void
 */
function block_assets() {

	wp_enqueue_style(
		'wop-rbs-frontend',
		WOP_RBS_URL . 'build/wop-rbs-frontend.css',
		array(),
		WOP_RBS_VER,
	);
}
add_action('enqueue_block_assets', __NAMESPACE__ . '\block_assets');
