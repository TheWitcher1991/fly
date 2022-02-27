'use strict'

const path              = require('path'),
	  webpack           = require('webpack')

let mode   = 'development',
	target = 'web'

if (process.env.NODE_ENV === 'production') {
	mode = 'production'
	target = 'browserslist'
}

module.exports = {
	target,
	devtool: 'source-map',
	entry: [
		'./app/app.js'
	],
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'fly.min.js',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			}
		]
	},

	resolve: {
		aliasFields: ['browser', 'browser.esm'],
        modules: ['node_modules'],
        extensions: ['.js',],
		fallback: {
			'http': false, // require.resolve("stream-http")
			'url': false // require.resolve("url")
		}
    }
}
