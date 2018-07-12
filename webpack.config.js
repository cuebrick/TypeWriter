var webpack= require('webpack');

module.exports = {
	entry: './src/index.js',

	output: {
		path: __dirname + '/dist/',
		filename: 'bundle.js'
	},

	devServer: {
		inline: true,
		port: 7777,
		contentBase: __dirname + '/dist/',
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
			},
			{
				test: /\.svg$/,
				loader: 'svg-react-loader'
			}
		]
	}
};