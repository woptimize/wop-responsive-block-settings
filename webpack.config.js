const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

module.exports = {
	...defaultConfig,

	entry: {
		'wop-rbs-editor' : path.resolve( process.cwd(), 'src/editor.js' ),
		'wop-rbs-frontend' : path.resolve( process.cwd(), 'src/frontend.scss' ),
	},

	output: {
		filename: '[name].js',
		path: path.resolve( process.cwd(), 'build/' ),
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			// Add additional rules as needed.
		]
	},

	plugins: [
		...defaultConfig.plugins,
		// Add additional plugins as needed.
		new RemoveEmptyScriptsPlugin(),
	],
};
