import React, { Component } from 'react';

import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';

import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';



import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

import createAlignmentPlugin from 'draft-js-alignment-plugin';


import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons';
import editorStyles from './editorStyles.css';
import linkStyles from './linkStyles.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-undo-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';



import ImageAdd from './ImageAdd';

class ImageButton extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editorState: props.editorState,
    }
  }

  onChange = (editorState) => {
    this.props.onChange(editorState);
  }

  render() {
    return (
      <ImageAdd 
        editorState={this.state.editorState}
        onChange={this.onChange}
        modifier={imagePlugin.addImage}
      />
    )
  }
}


const linkPlugin = createLinkPlugin({
  theme: linkStyles,
  placeholder: '请输入链接地址'
});

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

console.log('alignmentPlugin', alignmentPlugin);

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });


class AlignmentToolButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AlignmentTool />
    )
  }
}

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    HeadlineOneButton, 
    HeadlineTwoButton, 
    HeadlineThreeButton,
    Separator,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    Separator,
    linkPlugin.LinkButton,
    AlignmentToolButton,
    Separator,
  ]
});
const linkifyPlugin = createLinkifyPlugin();
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [
  inlineToolbarPlugin, 
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin, 
  linkPlugin, 
  undoPlugin,
  linkifyPlugin,
];
const text = 'In this editor a toolbar shows up once you select part of the text …';

export default class CustomInlineToolbarEditor extends Component {

  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          // <InlineToolbar />
        </div>
        <div>
          <ImageAdd
            editorState={this.state.editorState}
            onChange={this.onChange}
            modifier={imagePlugin.addImage}
          />
          <AlignmentTool />
        </div>
      </div>
    );
  }
}