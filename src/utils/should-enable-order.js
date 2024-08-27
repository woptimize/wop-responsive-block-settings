/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

/**
 * Determines whether the ordering functionality should be enabled for a block
 * based on its parent block.
 *
 * If the enabled state changes from the previous value, it updates the block attributes
 * to reflect the new state.
 *
 * @since 1.0.0
 *
 * @param {string} clientId - The unique identifier of the block to evaluate.
 * @param {object} previousState - The previous state of the ordering functionality.
 * @param {Function} setAttributes - A function to update the block attributes.
 *
 * @returns {boolean} - Returns `true` if ordering functionality should be enabled, otherwise `false`.
 */
export default function shouldEnableOrder( clientId, previousState, setAttributes ) {

	let parentBlock = false
	let shouldEnable = false

	// Get the parent block's clientId
	const parentClientIds = select( 'core/block-editor' ).getBlockParents( clientId )

	// Check if the block has a direct parent
	if ( parentClientIds.length > 0 ) {

		// The last item in the array is the direct parent
		const directParentClientId = parentClientIds[parentClientIds.length - 1]

		// Get the parent block's attributes
		parentBlock = select( 'core/block-editor' ).getBlock( directParentClientId )

		if (
			parentBlock.name === 'core/columns' ||
			( parentBlock.name === 'core/group' && ['flex', 'grid'].includes( parentBlock.attributes.layout.type ) )
		) {
			shouldEnable = true
		}
	}

	// Update attribute if it's different than the previous one
	if ( previousState.enabled !== shouldEnable) {
		setAttributes( {
			wopOrder : {
				...previousState,
				enabled : shouldEnable
			}
		} )
	}

	return shouldEnable
}
