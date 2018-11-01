import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

class TextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      field: ''
    }
  }



  render() {
    return (
      <div>
        Word Count: {this.props.words.length - 1 === -1 ? 0 : this.props.words.length - 1} of 500
        <ReactQuill value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder='your words...'
                    ref={this.props.editorReference}
                  />
      </div>
    )
  }
}

export default TextEditor
