import React, { Component } from 'react';

import CustomInlineToolbarEditor from '../components/IFRichEditor/index';

import rootStyle from './index.css';

export default 
class Root extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		  <div>
		  	<style dangerouslySetInnerHTML={{ __html: rootStyle }} />
		  	<div className="root">
			  <div style={{ margin: 120 }}>
			  	<CustomInlineToolbarEditor />
			  </div>
			</div>
		  </div>
		);
	}
}

