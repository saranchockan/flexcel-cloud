import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/tooltip'
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ru-RU';

class RichTextEditor extends Component {

  constructor(props) {
    super(props)

    this.state = {
      docOptions: {
        // Set height to full screen (resize just like Handsontable flow)
        height: 500,
        //width: 200,
        dialogsInBody: false,
        shortcuts: false,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['view', ['fullscreen']]
        ]
      }
    }
  }

  onChange(content) {
    console.log('onChange', content);
  }

  render() {
    return (
      <ReactSummernote
        value="Default value"
        options={this.state.docOptions}
        onChange={this.onChange}
      />
    );
  }
}

export default RichTextEditor;