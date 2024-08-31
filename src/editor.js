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
 * External dependencies
 */
import React, { useMemo } from 'react';

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
		const enableOrder = useMemo( () =>
			shouldEnableOrder(clientId, order, setAttributes),
			[clientId, order]
		);
		// Determine if reverse settings should be enabled
		const enableReverse = useMemo( () =>
			shouldEnableReverse(name, layout, reverse, setAttributes),
			[name, layout, reverse]
		);
		// Determine if stack settings should be enabled
		const enableStack = useMemo( () =>
			shouldEnableStack(name, layout, stack, setAttributes),
			[name, layout, stack]
		);
		// Determine if mobile menu settings should be enabled
		const enableMobileMenu = useMemo( () =>
			shouldEnableMobileMenu(name, overlayMenu, mobileMenu, setAttributes),
			[name, overlayMenu, mobileMenu]
		);

		/**
		 * Updates a specific property within a nested attribute of the block's attributes object.
		 *
		 * @param {string} property - The name of the attribute within the `attributes` object
		 *        that you want to update. For example, 'wopVisibility' or 'wopStack'.
		 * @param {string} key - The specific property within the nested attribute
		 *        that you want to update. For example, 'desktop' or 'mobile'.
		 * @param {*} value - The new value for the property specified by `key`. The type can
		 *        be anything depending on the property (e.g., boolean, string, number).
		 *
		 * @example
		 * // Update the 'desktop' property within the 'wopVisibility' attribute
		 * updateAttribute('wopVisibility', 'desktop', true);
		 *
		 * @returns {void}
		 */
		const updateAttribute  = (property, key, value) => {
			setAttributes({
				[property]: {
					...attributes[property],
					[key]: value,
				},
			});
		};


		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody title={ __('Responsive Settings', 'wop-responsive-block-settings') } initialOpen={ false }>
						<ToggleControl
							label={ __('Visible on Desktop', 'wop-responsive-block-settings') }
							checked={ visibility.desktop }
							onChange={ (desktop) =>
								updateAttribute('wopVisibility', 'desktop', desktop)
							}
						/>
						<ToggleControl
							label={ __('Visible on Tablet', 'wop-responsive-block-settings') }
							checked={ visibility.tablet }
							onChange={ (tablet) =>
								updateAttribute('wopVisibility', 'tablet', tablet)
							}
						/>
						<ToggleControl
							label={ __('Visible on Mobile', 'wop-responsive-block-settings') }
							checked={ visibility.mobile }
							onChange={ (mobile) =>
								updateAttribute('wopVisibility', 'mobile', mobile)
							}
						/>
						<ToggleControl
							label={ __('Keep visible in the Editor', 'wop-responsive-block-settings') }
							help={ visibility.editor ? __('Displayed with a gray dotted outline and grayed out if it should not be visible.', 'bbe') : __('Hidden if it should not be visible.', 'bbe') }
							checked={ visibility.editor }
							onChange={ (editor) =>
								updateAttribute('wopVisibility', 'editor', editor)
							}
						/>
						{ enableReverse &&
							<>
								<hr />
								<ToggleControl
									label={ __('Reverse order on Tablet', 'wop-responsive-block-settings') }
									checked={ reverse.tablet }
									onChange={ (tablet) =>
										updateAttribute('wopReverse', 'tablet', tablet)
									}
								/>
								<ToggleControl
									label={ __('Reverse order on Mobile', 'wop-responsive-block-settings') }
									checked={ reverse.mobile }
									onChange={ (mobile) =>
										updateAttribute('wopReverse', 'mobile', mobile)
									}
								/>
							</>
						}
						{ enableStack &&
							<>
								<hr />
								<ToggleControl
									label={ __('Stack on Tablet', 'wop-responsive-block-settings') }
									checked={ stack.tablet }
									onChange={ (tablet) =>
										updateAttribute('wopStack', 'tablet', tablet)
									}
								/>
								<ToggleControl
									label={ __('Stack on Mobile', 'wop-responsive-block-settings') }
									checked={ stack.mobile }
									onChange={ (mobile) =>
										updateAttribute('wopStack', 'mobile', mobile)
									}
								/>
							</>
						}
						{ enableOrder &&
							<>
								<hr />
								<NumberControl
									label={ __('Order on Tablet', 'wop-responsive-block-settings') }
									value={ order.tablet }
									onChange={ (tablet) => {
										tablet = tablet == '' ? 0 : tablet
										updateAttribute('wopOrder', 'tablet', tablet)
									} }
								/>
								<NumberControl
									label={ __('Order on Mobile', 'wop-responsive-block-settings') }
									value={ order.mobile }
									onChange={ (mobile) => {
										mobile = mobile == '' ? 0 : mobile
										updateAttribute('wopOrder', 'mobile', mobile)
									} }
								/>
							</>
						}
						{ enableMobileMenu &&
							<>
								<hr />
								<ToggleGroupControl
									label={ __('Mobile Menu breakpoint in px', 'wop-responsive-block-settings') }
									help={ __('The WordPress default value is 600px.') }
									value={ mobileMenu.breakpoint }
									onChange={ (breakpoint) =>
										updateAttribute('wopMobileMenu', 'breakpoint', breakpoint)
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

		if ( reverse?.enabled ) {
			if ( reverse.tablet ) classes.push( 'wop-reverse-on-tablet' )
			if ( reverse.mobile ) classes.push( 'wop-reverse-on-mobile' )
		}

		if ( stack?.enabled ) {
			if ( stack.tablet ) classes.push( 'wop-stack-on-tablet' )
			if ( stack.mobile ) classes.push( 'wop-stack-on-mobile' )
		}
		if ( order?.enabled ) {
			if ( order.tablet != 0 ) style = { ...style, '--wop--order--tablet': order.tablet }
			if ( order.mobile != 0 ) style = { ...style, '--wop--order--mobile': order.mobile }

			if ( order.mobile != 0 || order.tablet != 0 ) {
				classes.push( 'wop-has-order' )
			}
		}
		if ( mobileMenu?.enabled && mobileMenu.breakpoint !== 600 ) {
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
