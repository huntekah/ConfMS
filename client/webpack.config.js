const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
    },
	module: {
		rules: [
			{ test: /\.(js|jsx)$/, use: 'babel-loader', exclude: path.resolve(__dirname, 'node_modules') }
			]
	},
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};
