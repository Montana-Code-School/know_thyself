import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
//this is being used
class HtmlComponent extends Component {
  render() {
    return <div>{ ReactHtmlParser(this.props.entry) }</div>
  }
}

export default HtmlComponent
