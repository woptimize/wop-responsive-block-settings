<?php
/**
 * Fix REST API issue with blocks registered via PHP register_block_type and/or rendered server-side.
 * Without this, server-side blocks will not load in the block editor.
 *
 * @package wop-responsive-block-settings
 *
 * @since   1.0.1
 */

namespace Woptimize\RBS\Rest;

defined( 'ABSPATH' ) || exit;

/**
 *
 * Conditionally removes custom attributes from block renderer REST API requests.
 *
 * This function intercepts REST API requests to the block renderer endpoint
 * and removes specified custom attributes from the request. This prevents
 * custom attributes from being sent to the server, which can cause errors
 * if these attributes are not registered with the REST API schema.
 *
 * @see: https://github.com/CakeWP/block-options/blob/aec36d2d6b9aedf9217c0f6f9e87f8eab1a08cb9/includes/class-editorskit-post-meta.php#L112-L147
 *
 * @since 1.0.1
 *
 * @param mixed           $result  Response to replace the requested version with.
 * @param WP_REST_Server  $server  Server instance.
 * @param WP_REST_Request $request Request used to generate the response.
 *
 * @return mixed The original $result, as this function only modifies the request.
 */
function conditionally_remove_attributes( $result, $server, $request ) {
    // Check if the current request is for the block renderer endpoint
	if ( strpos( $request->get_route(), '/wp/v2/block-renderer' ) !== false ) {
        // Only proceed if the request has attributes
		if ( isset( $request['attributes'] ) ) {
            // List of custom attribute names to be removed
			$attribute_names = array(
				'wopVisibility',
				'wopStack',
				'wopReverse',
				'wopOrder',
				'wopMobileMenu',
			);
            // Loop through each custom attribute
			foreach ( $attribute_names as $name ) {
                // Check if the current attribute exists in the request
				if (isset( $request['attributes'][$name] ) ) {
                    // Get the current attributes
					$attributes = $request['attributes'];
                    // Remove the custom attribute
					unset( $attributes[$name] );
                    // Update the request with the modified attributes
					$request['attributes'] = $attributes;
				}
			}
		}
	}
    // Return the original result, as we've only modified the request
	return $result;
}
add_filter( 'rest_pre_dispatch', __NAMESPACE__ . '\conditionally_remove_attributes', 10, 3 );
