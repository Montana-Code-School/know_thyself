import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const styles = {
  editor: {
    width: '65%',
    margin: '0 0 0 6%',
    float: 'left',
    display: 'inline-block'
  },
  wordCount: {
    marginBottom: 0,
    marginLeft: '58%'
  }
};

class TextEditor extends Component {

  render() {
    return (
      <div>
        <h5 style={styles.wordCount}>
          Word Count: {this.props.words.length - 1 === -1 ? 0 : this.props.words.length - 1} of 500
        </h5>
        <ReactQuill value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder='your words...'
                    style={styles.editor}
                    ref={this.props.editorReference}
                  />
      </div>
    )
  }
}

export default TextEditor
