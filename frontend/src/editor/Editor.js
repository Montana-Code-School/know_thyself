import React, { Component } from 'react';
import ReactQuill from 'react-quill';
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
        <ReactQuill modules={modules}
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
  ]
}
export default TextEditor
