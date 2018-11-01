import React, { Component } from 'react';
import { Editor, EditorState} from 'draft-js';
import './Editor.css'

class Textfield extends Component {

  state = {
    editorState: EditorState.createEmpty()
  };
    onChange = (editorState) => this.setState({editorState});

  render() {
    return (
        <Editor style={{backgroundColor: 'red'}} editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}



export default Textfield;
