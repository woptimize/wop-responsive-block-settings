/**
 * Determines whether the mobile menu functionality should be enabled for a block.
 *
 * If the enabled state changes from the previous value, it updates the block attributes
 * to reflect the new state.
 *
 * @since 1.0.0
 *
 * @param {string} name - The block name to evaluate.
 * @param {string} overlayMenu - The current overlay menu core setting
 * @param {object} previousState - The previous state of the mobile menu functionality.
 * @param {Function} setAttributes - A function to update the block attributes.
 *
 * @returns {boolean} - Returns `true` if functionality should be enabled, otherwise `false`.
 */
export default function shouldEnableMobileMenu( name, overlayMenu, previousState, setAttributes ) {
	let shouldEnable = false

	if ( name === 'core/navigation' && overlayMenu === 'mobile' ) {
		shouldEnable = true
	}

	// Update attribute if it's different than the previous one
	if ( previousState.enabled !== shouldEnable) {
		setAttributes( {
			wopMobileMenu : {
				...previousState,
				enabled : shouldEnable
			}
		} )
	}

	return shouldEnable
}
