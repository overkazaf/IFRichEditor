const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = {
  entry: {
  	app: [
		'webpack-dev-server/client?http://localhost:9999',
		'webpack/hot/only-dev-server',
		path.join(__dirname, 'index.js'),
	],
  },
  output: {
    path: '/dist',
    filename: '[name][hash:12].js',
    publicPath: '/'
  },
  cache: true,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.web.js','.js', '.jsx','.json']
  },
  module: {
    loaders: [
		{
		  test: /.js?$/,
		  loaders: ['babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&presets[]=stage-1', 'webpack-module-hot-accept'],
		  exclude: /node_modules/
		},
    {
        test: /plugin\.css$/,
        loaders: [
          'style-loader', 'css-loader',
        ],
      },
		{
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', {
        loader: 'css-loader',
          options: {
          modules: true,//让css-loader支持Css Modules。
        },
      }]
    }
    ]
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
  	  template : path.join(__dirname, 'index.html'),
  	  hash     : false,
  	  // favicon  : project.paths.public('favicon.ico'),
  	  filename : 'index.html',
  	  inject   : 'body',
  	  minify   : {
  	    collapseWhitespace : true
  	  }
  	}),
    new webpack.NoErrorsPlugin(),
  ]
};


module.exports = webpackConfig;