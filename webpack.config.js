var webpack= require('webpack');

module.exports = {
	entry: './src/index.js',

	output: {
		path: __dirname + '/build/',
		filename: 'bundle.js'
	},

	devServer: {
		inline: true,
		port: 7777,
		contentBase: __dirname + '/build/',
		historyApiFallback: true
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react']
				}
			}
		]
	}
};