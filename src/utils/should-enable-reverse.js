/**
 * Determines whether the reverse functionality should be enabled for a block.
 *
 * @since 1.0.0
 *
 * @param {string} name - The block name to evaluate.
 * @param {object} layout - The layout attributes of the block.
 *
 * @returns {boolean} - Returns `true` if functionality should be enabled, otherwise `false`.
 */
export default function shouldEnableReverse( name, layout ) {
	if (
		(name === 'core/group' && layout?.type === 'flex') ||
		name === 'core/columns'
	) {
		return true
	}

	return false
}
