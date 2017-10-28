'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertNewLine;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

function insertNewLine(editorState) {
  var newEditorState = editorState;
  var contentState = newEditorState.getCurrentContent();
  var selectionState = newEditorState.getSelection();
  var currentBlock = contentState.getBlockForKey(selectionState.getFocusKey());

  var fragmentArray = [currentBlock, new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    type: 'unstyled',
    text: '',
    characterList: (0, _immutable.List)()
  })];

  var fragment = _draftJs.BlockMapBuilder.createFromArray(fragmentArray);

  var withUnstyledBlock = _draftJs.Modifier.replaceWithFragment(contentState, selectionState, fragment);

  var newContent = withUnstyledBlock.merge({
    selectionAfter: withUnstyledBlock.getSelectionAfter().set('hasFocus', true)
  });

  return _draftJs.EditorState.push(newEditorState, newContent, 'insert-fragment');
}