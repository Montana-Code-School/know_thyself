import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

class TextEditor extends Component {
  render() {
    let words = this.props.value.split(' ')
    return (
      <div>
        Word Count: {words.length - 1} of 500
        <ReactQuill value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder='your words...'
                  />
      </div>
    )
  }
}

export default TextEditor
