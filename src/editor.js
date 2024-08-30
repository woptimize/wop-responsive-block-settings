/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { addFilter } from '@wordpress/hooks'
import { createHigherOrderComponent } from '@wordpress/compose'
import { InspectorControls } from '@wordpress/block-editor'
import {
	PanelBody,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components'

/**
 * Internal dependencies
 */
import { defaultSettings } from './data/default-settings'
import {
	shouldEnableReverse,
	shouldEnableStack,
	shouldEnableOrder,
	shouldEnableMobileMenu,
} from './utils'

/**
 * Adds custom attributes to blocks.
 *
 * @since 1.0.0
 *
 * @param {Object} props - The original block properties.
 *
 * @return {Object} Updated block properties with custom attributes.
 */
const addResponsiveAttributes = (props) => {
	const newProps = {
		...props,
		attributes: {
			...props.attributes,
			...defaultSettings,
		}
	}

	return newProps
}
addFilter(
	'blocks.registerBlockType',
	'wop/rbs/add-responsive-attributes',
	addResponsiveAttributes
)

/**
 * Adds custom responsive settings controls to the block inspector panel.
 *
 * @since 1.0.0
 *
 * @param {Object} BlockEdit - Original block edit component.
 *
 * @return {Object} Wrapped component with added inspector controls.
 */
const withResponsiveControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes, name, clientId } = props
		const {
			wopVisibility : visibility,
			wopStack : stack,
			wopReverse : reverse,
			wopOrder : order,
			wopMobileMenu : mobileMenu,
			layout,
			overlayMenu
		} = attributes

		// Determine if custom ordering should be enabled
		const enableOrder = shouldEnableOrder( clientId, order, setAttributes )
		// Determine if reverse settings should be enabled
		const enableReverse = shouldEnableReverse( name, layout, reverse, setAttributes )
		// Determine if stack settings should be enabled
		const enableStack = shouldEnableStack( name, layout, stack, setAttributes )
		// Determine if mobile menu settings should be enabled
		const enableMobileMenu = shouldEnableMobileMenu( name, overlayMenu, mobileMenu, setAttributes )


		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody title={ __('Responsive Settings', 'wop-rbs') } initialOpen={ false }>
						<ToggleControl
							label={ __('Visible on Desktop', 'wop-rbs') }
							checked={ visibility.desktop }
							onChange={ (desktop) =>
								setAttributes( {
									wopVisibility : {
										...visibility,
										desktop
									}
								} )
							}
						/>
						<ToggleControl
							label={ __('Visible on Tablet', 'wop-rbs') }
							checked={ visibility.tablet }
							onChange={ (tablet) =>
								setAttributes( {
									wopVisibility : {
										...visibility,
										tablet
									}
								} )
							}
						/>
						<ToggleControl
							label={ __('Visible on Mobile', 'wop-rbs') }
							checked={ visibility.mobile }
							onChange={ (mobile) =>
								setAttributes( {
									wopVisibility : {
										...visibility,
										mobile
									}
								} )
							}
						/>
						<ToggleControl
							label={ __('Keep visible in the Editor', 'wop-rbs') }
							help={ visibility.editor ? __('Displayed with a gray dotted outline and grayed out if it should not be visible.', 'bbe') : __('Hidden if it should not be visible.', 'bbe') }
							checked={ visibility.editor }
							onChange={ (editor) =>
								setAttributes( {
									wopVisibility : {
										...visibility,
										editor
									}
								} )
							}
						/>
						{ enableReverse &&
							<>
								<hr />
								<ToggleControl
									label={ __('Reverse order on Tablet', 'wop-rbs') }
									checked={ reverse.tablet }
									onChange={ (tablet) =>
										setAttributes( {
											wopReverse : {
												...reverse,
												tablet
											}
										} )
									}
								/>
								<ToggleControl
									label={ __('Reverse order on Mobile', 'wop-rbs') }
									checked={ reverse.mobile }
									onChange={ (mobile) =>
										setAttributes( {
											wopReverse : {
												...reverse,
												mobile
											}
										} )
									}
								/>
							</>
						}
						{ enableStack &&
							<>
								<hr />
								<ToggleControl
									label={ __('Stack on Tablet', 'wop-rbs') }
									checked={ stack.tablet }
									onChange={ (tablet) =>
										setAttributes( {
											wopStack : {
												...stack,
												tablet
											}
										} )
									}
								/>
								<ToggleControl
									label={ __('Stack on Mobile', 'wop-rbs') }
									checked={ stack.mobile }
									onChange={ (mobile) =>
										setAttributes( {
											wopStack : {
												...stack,
												mobile
											}
										} )
									}
								/>
							</>
						}
						{ enableOrder &&
							<>
								<hr />
								<NumberControl
									label={ __('Order on Tablet', 'wop-rbs') }
									value={ order.tablet }
									onChange={ (tablet) => {
										tablet = tablet == '' ? 0 : tablet
										setAttributes( {
											wopOrder : {
												...order,
												tablet
											}
										} )
									} }
								/>
								<NumberControl
									label={ __('Order on Mobile', 'wop-rbs') }
									value={ order.mobile }
									onChange={ (mobile) => {
										mobile = mobile == '' ? 0 : mobile
										setAttributes( {
											wopOrder : {
												...order,
												mobile
											}
										} )
									} }
								/>
							</>
						}
						{ enableMobileMenu &&
							<>
								<hr />
								<ToggleGroupControl
									label={ __('Mobile Menu breakpoint in px', 'wop-rbs') }
									help={ __('The WordPress default value is 600px.') }
									value={ mobileMenu.breakpoint }
									onChange={ (breakpoint) =>
										setAttributes( {
											wopMobileMenu : {
												...mobileMenu,
												breakpoint
											}
										} )
									}
									isBlock
								>
									<ToggleGroupControlOption value="480" label="480" />
									<ToggleGroupControlOption value="600" label="600" />
									<ToggleGroupControlOption value="768" label="768" />
									<ToggleGroupControlOption value="992" label="992" />
									<ToggleGroupControlOption value="1024" label="1024" />
									<ToggleGroupControlOption value="1200" label="1200" />
								</ToggleGroupControl>
							</>
						}
					</PanelBody>
				</InspectorControls>
			</>
		)
	}
}, 'withResponsiveControls')
addFilter(
	'editor.BlockEdit',
	'wop/rbs/with-responsive-controls',
	withResponsiveControls,
	100 // Adjust to change position in the sidebar
)



/**
 * Adds custom classes and attributes to the block wrapper in the editor
 *
 * @since 1.0.0
 *
 * @param {Object} BlockListBlock - Original block list block component.
 *
 * @return {Object} Wrapped component with added custom classes.
 */
const withResponsiveAttributes = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { attributes, className, wrapperProps: existingWrapperProps = {} } = props
		const {
			wopVisibility : visibility,
			wopStack : stack,
			wopReverse : reverse,
			wopOrder : order,
			wopMobileMenu : mobileMenu,
		} = attributes

		let classes = className ? className.split(' ') : []
		let wrapperProps = { ...existingWrapperProps }
		let style = { ...(existingWrapperProps.style || {}) }

		if ( visibility ) {
			if ( ! visibility.desktop ) classes.push( 'wop-hide-on-desktop' )
			if ( ! visibility.tablet ) classes.push( 'wop-hide-on-tablet' )
			if ( ! visibility.mobile ) classes.push( 'wop-hide-on-mobile' )
			if ( ! visibility.editor ) classes.push( 'wop-hide-on-editor' )
		}

		if ( reverse && reverse.enabled ) {
			if ( reverse.tablet ) classes.push( 'wop-reverse-on-tablet' )
			if ( reverse.mobile ) classes.push( 'wop-reverse-on-mobile' )
		}

		if ( stack && stack.enabled ) {
			if ( stack.tablet ) classes.push( 'wop-stack-on-tablet' )
			if ( stack.mobile ) classes.push( 'wop-stack-on-mobile' )
		}
		if ( order && order.enabled ) {
			if ( order.tablet != 0 ) style = { ...style, '--wop--order--tablet': order.tablet }
			if ( order.mobile != 0 ) style = { ...style, '--wop--order--mobile': order.mobile }

			if ( order.mobile != 0 || order.tablet != 0 ) {
				classes.push( 'wop-has-order' )
			}
		}
		if ( mobileMenu && mobileMenu.enabled && mobileMenu.breakpoint !== 600 ) {
			classes.push( 'wop-has-mobile-menu-breakpoint' )
			classes.push( 'wop-mobile-menu-breakpoint-' + mobileMenu.breakpoint )
		}
		wrapperProps.style = style
		props.className = classes.join(' ')
		props.wrapperProps = wrapperProps

		return <BlockListBlock { ...props } />
	}
}, 'withResponsiveAttributes')
addFilter(
	'editor.BlockListBlock',
	'wop/rbs/with-responsive-attributes',
	withResponsiveAttributes
)
