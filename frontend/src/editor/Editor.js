import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

class TextEditor extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   text: ''
    // }
    // this.onChange = this.onChange.bind(this)
  }
  //
  // onChange = (editorState) => {
  //   this.setState({
  //     text: editorState
  //   })
  //   console.log(this.state.text)
  // }

  render() {
    return (
      <div>
        <ReactQuill value={this.props.value}
                    onChange={this.props.handleChange}/>
      </div>
    )
  }
}

export default TextEditor
