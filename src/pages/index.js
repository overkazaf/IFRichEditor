import React, { Component } from 'react';
import CustomInlineToolbarEditor from '../components/IFRichEditor/index';
import rootStyles from './index.css';

export default 
class Root extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		  <div>
		  	<div className={rootStyles.root}>
			  <div className={rootStyles.editorContainer}>
			  	<CustomInlineToolbarEditor />
			  </div>
			</div>
		  </div>
		);
	}
}

