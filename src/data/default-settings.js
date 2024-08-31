/**
 * Default settings
 */
export const defaultSettings = {
	wopVisibility: {
		type: 'object',
		default: {
			desktop: true,
			tablet: true,
			mobile: true,
			editor: true,
		}
	},
	wopStack: {
		type: 'object',
		default: {
			tablet: false,
			mobile: false,
		}
	},
	wopReverse: {
		type: 'object',
		default: {
			tablet: false,
			mobile: false,
		}
	},
	wopOrder: {
		type: 'object',
		default: {
			tablet: 0,
			mobile: 0,
		}
	},
	wopMobileMenu: {
		type: 'object',
		default: {
			breakpoint: 600
		}
	}
}
