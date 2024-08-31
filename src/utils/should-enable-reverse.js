/**
 * Determines whether the reverse functionality should be enabled for a block.
 *
 * If the enabled state changes from the previous value, it updates the block attributes
 * to reflect the new state.
 *
 * @since 1.0.0
 *
 * @param {string} name - The block name to evaluate.
 * @param {object} layout - The layout attributes of the block.
 * @param {object} previousState - The previous state of the reversing functionality.
 * @param {Function} setAttributes - A function to update the block attributes.
 *
 * @returns {boolean} - Returns `true` if functionality should be enabled, otherwise `false`.
 */
export default function shouldEnableReverse( name, layout, previousState, setAttributes ) {
	let shouldEnable = false

	if (
		(name === 'core/group' && layout?.type === 'flex') ||
		name === 'core/columns'
	) {
		shouldEnable = true
	}

	// Update attribute if it's different than the previous one
	if ( previousState.enabled !== shouldEnable) {
		setAttributes( {
			wopReverse : {
				...previousState,
				enabled : shouldEnable
			}
		} )
	}

	return shouldEnable
}
