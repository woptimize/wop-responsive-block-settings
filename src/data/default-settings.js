/**
 * Default settings
 */
export const defaultSettings = {
	wopVisibility: {
		type: 'object',
		default: {
			enabled: false,
			desktop: true,
			tablet: true,
			mobile: true,
			editor: true,
		}
	},
	wopStack: {
		type: 'object',
		default: {
			enabled: false,
			tablet: false,
			mobile: false,
		}
	},
	wopReverse: {
		type: 'object',
		default: {
			enabled: false,
			tablet: false,
			mobile: false,
		}
	},
	wopOrder: {
		type: 'object',
		default: {
			enabled: false,
			tablet: 0,
			mobile: 0,
		}
	},
	wopMobileMenu: {
		type: 'object',
		default: {
			enabled: false,
			breakpoint: 600
		}
	}
}
