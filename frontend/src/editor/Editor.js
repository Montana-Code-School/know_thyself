import React, { Component } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'
import { Typography  } from '@material-ui/core';
import styles from './Editor-styles';

import './Editor.css'


class TextEditor extends Component {

  render() {
    return (
      <div>
        <Typography style={styles.wordCount}>
          Word Count: {this.props.words.length - 1 === -1 ? 0 : this.props.words.length - 1} of 500
        </Typography>
        <ReactQuill
          // formats={formats}
                    modules={modules}
                    theme='snow'
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder='your words...'
                    style={styles.editor}
                    ref={this.props.editorReference}
                  />
      </div>
    )
  }
}

let modules = {
  toolbar: [
    [{size: ['normal', 'large', 'small']}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['bold', 'italic', 'underline', 'strike']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    // matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
let formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
export default TextEditor
