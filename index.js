import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import APP from './src/pages/index';


function render() {
	ReactDOM.render(
		<APP />, 
		document.getElementById('app')
	);
}

setTimeout(render, 16);
