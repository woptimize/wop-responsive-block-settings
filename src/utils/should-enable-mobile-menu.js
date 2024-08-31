/**
 * Determines whether the mobile menu functionality should be enabled for a block.
 *
 * @since 1.0.0
 *
 * @param {string} name - The block name to evaluate.
 * @param {string} overlayMenu - The current overlay menu core setting
 *
 * @returns {boolean} - Returns `true` if functionality should be enabled, otherwise `false`.
 */
export default function shouldEnableMobileMenu( name, overlayMenu ) {
	if ( name === 'core/navigation' && overlayMenu === 'mobile' ) {
		return true
	}

	return false
}
