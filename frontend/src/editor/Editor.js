import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Typography  } from '@material-ui/core';


const styles = {
  editor: {
    width: '93%',
    margin: '0 2% 2% 2%',
    float: 'left',
    height: '280px',
    display: 'inline-block',
    border: 'solid 1px #373737'
  },
  wordCount: {
    fontSize: 12,
    marginBottom: 0,
    marginLeft: '76%',
    fontStyle: 'italic'
  }
};


class TextEditor extends Component {

  render() {
    return (
      <div>
        <Typography style={styles.wordCount}>
          Word Count: {this.props.words.length - 1 === -1 ? 0 : this.props.words.length - 1} of 500
        </Typography>
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
