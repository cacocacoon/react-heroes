const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const APP_DIR = path.resolve(__dirname, 'src')
const BUILD_DIR = path.resolve(__dirname, 'docs')

const config = (env, options) => ({
	entry: {
		app: APP_DIR + '/app.jsx',
	},
	output: {
		publicPath: '/',
		path: BUILD_DIR,
		filename: '[name].[contenthash].js'
	},
	module: {
		rules: [{
			loader: 'webpack-ant-icon-loader',
			enforce: 'pre',
			include: require.resolve('@ant-design/icons/lib/dist')
		}, {
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: ['babel-loader', 'eslint-loader'],
		}, {
			test: /\.s?css$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: options.mode !== 'production' ? 'source-map' : '',
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
			filename: 'style.[contenthash].css'
		}),
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb/),
		options.mode === 'production' && new CleanWebpackPlugin(),
		options.mode === 'production' && new BundleAnalyzerPlugin()
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					chunks: chunk => chunk.name !== 'antd-icons',
					filename: 'vendors.[contenthash].js',
				},
				style: {
					chunks: 'all',
					test: /\.css$/,
					enforce: true
				}
			}
		}
	}
})

module.exports = config

