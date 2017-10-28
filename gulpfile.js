var gulp = require('gulp'),
	webpack = require('webpack'),
	open = require('open'),
	webpackDevServer = require('webpack-dev-server'),
	webpackDevConfig = require('./webpack.config.js');

gulp.task('dev', function() {
	var compiler = webpack(webpackDevConfig);
	new webpackDevServer(compiler, {
		contentBase: './',
		historyApiFallback: true,
		disableHostCheck: true,
		hot: true,
		noInfo: false,
		publicPath: '/'
	}).listen('9999', function(err) {
		console.log('listening: http://localhost:9999');
		console.log('Opening your system browser...');
		open('http://localhost:9999');
	})
});

gulp.task('default', ['dev']);
