<?php
/**
 * Conditionally renders each block based on its visibility settings.
 *
 * @package wop-responsive-block-settings
 *
 * @since   1.0.0
 */

namespace Woptimize\Rbs\Frontend;

defined( 'ABSPATH' ) || exit;

/**
 * WordPress dependencies
 */
use WP_HTML_Tag_Processor;

/**
 * Edit the HTML markup of blocks when necessary, adding the appropriate classes
 * and attributes based on the block attributes
 *
 * @since 1.0.0
 *
 * @param string   $block_content The block content to be filtered.
 * @param array    $block         The block array containing block name and attributes.
 *
 * @return string $block_content The filtered block content.
 */
function render_block_settings( $block_content, $block ) {

	// Get all responsive attributes
	$visibility = $block['attrs']['wopVisibility'] ?? null;
	$stack = $block['attrs']['wopStack'] ?? null;
	$reverse = $block['attrs']['wopReverse'] ?? null;
	$order = $block['attrs']['wopOrder'] ?? null;
	$mobileMenu = $block['attrs']['wopMobileMenu'] ?? null;

	// Return original content if ALL block settings are not defined
	if (
		! isset( $visibility ) &&
		! isset( $stack ) &&
		! isset( $reverse ) &&
		! isset( $order) &&
		! isset( $mobileMenu)
	) {
		return $block_content;
	}

	// Set this to true if we need to add any class or attribute to the HTML markup
	$should_change = false;

	// Array to store responsive classes
	$classes = array();

	// Add missing vertical alignment class
	if ( ! empty( $block['attrs']['layout']['verticalAlignment'] ) ) {
		$classes[] = 'is-vertical-align-' . sanitize_title( $block['attrs']['layout']['verticalAlignment'] );
	}

	// Visibility classes
	if ( isset( $visibility ) ) {
		if ( ! $visibility['desktop'] ) $classes[] = 'wop-hide-on-desktop';
		if ( ! $visibility['tablet'] ) $classes[] = 'wop-hide-on-tablet';
		if ( ! $visibility['mobile'] ) $classes[] = 'wop-hide-on-mobile';
		if ( ! $visibility['desktop'] || ! $visibility['tablet'] || ! $visibility['mobile'] ) {
			$should_change = true;
		}
	}
	// Reverse classes
	if ( isset( $reverse ) && $reverse['enabled'] ) {
		if ( $reverse['tablet'] ) $classes[] = 'wop-reverse-on-tablet';
		if ( $reverse['mobile'] ) $classes[] = 'wop-reverse-on-mobile';
		if ( $reverse['tablet'] || $reverse['mobile'] ) {
			$should_change = true;
		}
	}
	// Stack classes
	if ( isset( $stack ) && $stack['enabled'] ) {
		if ( $stack['tablet'] ) $classes[] = 'wop-stack-on-tablet';
		if ( $stack['mobile'] ) $classes[] = 'wop-stack-on-mobile';
		if ( $stack['tablet'] || $stack['mobile'] ) {
			$should_change = true;
		}
	}

	// Order class & CSS variables
	$style = '';
	if (
		isset( $order ) &&
		$order['enabled'] &&
		(
			$order['tablet'] !== 0 ||
			$order['mobile'] !== 0
		)
	) {
		$style .= '--wop--order--tablet:' . $order['tablet'] . ';';
		$style .= '--wop--order--mobile:' . $order['mobile'] . ';';
		$classes[] = 'wop-has-order';
		$should_change = true;
	}

	// Mobile Menu class & CSS variables
	if (
		isset( $mobileMenu ) &&
		$mobileMenu['enabled'] &&
		$mobileMenu['breakpoint'] !== 600
	) {
		$classes[] = 'wop-has-mobile-menu-breakpoint';
		$classes[] = 'wop-mobile-menu-breakpoint-' . $mobileMenu['breakpoint'];
		$should_change = true;
	}

	// Return the original block content if the markup shouldn't change
	if ( ! $should_change ) {
		return $block_content;
	}

	// Process the block HTML
	$html_tags = new WP_HTML_Tag_Processor( $block_content );

	// Find the first HTML tag
	if ( $html_tags->next_tag() ) {
		// Add responsive classes
		if ( ! empty( $classes ) ) {
			$html_tags->add_class( implode( ' ', $classes ) );
		}
		// Add inline styles
		if ( $style != '' ) {
			// Concatenate any existing inline styles
			if ( $original_style = $html_tags->get_attribute( 'style' ) ) {
				$style = $original_style . ' ' . $style;
			}
			// `set_attribute` will override any existing style
			$html_tags->set_attribute( 'style', $style );
		}
	}

	return $html_tags->get_updated_html();
}
add_filter( 'render_block', __NAMESPACE__ . '\render_block_settings', 10, 2);

