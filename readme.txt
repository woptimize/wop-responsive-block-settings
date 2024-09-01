===  Responsive Block Settings ===
Contributors:      stefanoginella
Stable tag:        1.0.0
Requires at least: 6.4
Tested up to:      6.6
Requires PHP:      7.4
Tags:              responsive, visibility, breakpoints, gutenberg plugin, block settings
License:           GPLv2 or later.
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Easily add responsive settings to all WordPress blocks, and customize the mobile menu breakpoint.

== Description ==

**Responsive Block Settings** is a user-friendly, no-code plugin that allows you to enhance your WordPress blocks with responsive controls, ensuring your content is optimized for all screen sizes.

=== Key Features:===

- **Visibility Control**: Hide or show any block based on the screen size—mobile (less than 768px), tablet (768px to 1024px), or desktop (greater than 1024px).
- **Flexible Layout Management**: Stack, reverse, or customize the order of inner blocks within core group blocks using flex layouts and core columns. Ideal for managing complex designs and ensuring optimal content flow across devices.
- **Custom Mobile Menu Breakpoint**: Adjust the mobile menu breakpoint for the core navigation block to better align with your site's design.

This plugin provides a simple, intuitive interface, making it accessible for users of all skill levels. It's perfect for anyone looking to fine-tune their site's responsiveness without touching a single line of code.

=== Usage ===

**For All Blocks:**

- Toggle "Hide on Desktop", "Hide on Tablet", and "Hide on Mobile" options to control visibility across devices.
- Enable "Keep visible in the Editor" to maintain block visibility during editing, even when hidden at certain resolutions. Blocks will appear with a dashed border and grayed-out, preserving layout awareness.

**For Stack Groups, Row Groups, and Columns:**

- Toggle "Reverse order on Tablet" and "Reverse order on Mobile" to alter the sequence of inner blocks on respective devices and reverse the order.


**For Row Groups:**

- Toggle "Stack on Tablet" and "Stack on Mobile" to arrange inner blocks vertically on smaller screens.

**For Direct Child Blocks (within Stack Groups, Row Groups, Grid Groups, and Columns):**

- Specify custom values for "Order on Tablet" and "Order on Mobile" to set precise positioning on different devices.

**For Navigation Blocks with Mobile Overlay Menu:**

- Select a custom breakpoint to determine when the navigation collapses into a menu icon, allowing for tailored responsive behavior.

=== Screenshots ===

1. Visibility options available on all blocks for desktop, tablet, and mobile.
2. "Keep visible in the Editor" will keep the block visible with a dashed border and grayed out if if should be hidden at the current resolution.
3. Stack groups, Row groups, and Columns will have the options to reverse the order of inner blocks on tablet and mobile.
4. Row groups will also have the options to stack inner blocks on tablet and mobile.
5. Direct inner blocks of Stack groups, Row groups, Grid groups, and Columns will have the options to set a specific order within their parent on tablet and mobile.
6. Navigation blocks with the Mobile Overlay Menu will have the option to select a different breakpoint to collapse the natigation and display the menu icon.

== Installation ==

= Install from within WordPress =

1. Navigate to **Plugins > Add New**.
2. Search for **Responsive Block Settings**.
3. Click **Install Now**, then **Activate**.

= Manual installation =

1. Upload the `responsive-block-settings` folder to the `/wp-content/plugins/` directory.
2. Go to **Plugins** in your WordPress admin dashboard.
3. Find and activate the **Responsive Block Settings** plugin.

== Frequently Asked Questions ==

= Is the plugin compatible with any theme or plugin? =

Yes, the plugin is designed to work seamlessly with any theme or plugin, extending the block editor. If you encounter any issues, please report them through the WordPress support forum.

= Is the plugin compatible with Elementor or other page builders? =

No, the plugin is designed to work exclusively with the WordPress block editor (Gutenberg).

= How can I request support, report a bug, or suggest a feature? =

For support, bug reports, or feature requests, please use the WordPress support forum. Provide as many details as possible to help us assist you effectively.

= Is the plugin's source code publicly available?

Yes, you can access the source code on GitHub: [Responsive Block Settings GitHub Repository](https://github.com/woptimize/responsive-block-settings).


== Changelog ==

= 1.0.0 - 2024-08-27 =

Initial release.
