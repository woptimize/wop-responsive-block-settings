/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

/**
 * Determines whether the ordering functionality should be enabled for a block
 * based on its parent block.
 *
 * @since 1.0.0
 *
 * @param {string} clientId - The unique identifier of the block to evaluate.
 *
 * @returns {boolean} - Returns `true` if ordering functionality should be enabled, otherwise `false`.
 */
export default function shouldEnableOrder( clientId ) {
	let parentBlock = false
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
			( parentBlock.name === 'core/group' && ['flex', 'grid'].includes( parentBlock.attributes.layout?.type ) )
		) {
			return true
		}
	}

	return false
}
