const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const APP_DIR = path.resolve(__dirname, 'src')
const BUILD_DIR = path.resolve(__dirname, 'docs')

const config = {
	entry: APP_DIR + '/app.jsx',
	output: {
		publicPath: '/',
		path: BUILD_DIR,
		filename: 'app.js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: ['babel-loader', 'eslint-loader'],
		}, {
			test: /\.scss$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		inline: true,
		contentBase: BUILD_DIR,
		port: 8008
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Go Hero!',
			meta: {
				description: 'Zero to Hero',
				viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
			},
			template: APP_DIR + '/index.html',
			hash: true,
			cache: false,
		}),
		new MiniCssExtractPlugin({
			filename: 'style.[hash].css'
		})
	]
}

module.exports = config

