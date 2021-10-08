import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

var Parchment = ReactQuill.Quill.import('parchment');
var QuillStyle = Parchment.Attributor.Style;
var styleOptions = { scope: Parchment.Scope.INLINE };
ReactQuill.Quill.register(new QuillStyle('size', 'font-size', styleOptions), true);
ReactQuill.Quill.register(new QuillStyle('font', 'font-family', styleOptions), true);

const modules = {
	toolbar: [
		[{ font: [] }, { size: [] }],
		[{ align: [] }, 'direction' ],
		[ 'bold', 'italic', 'underline', 'strike' ],
		[{ color: [] }, { background: [] }],
		[{ script: 'super' }, { script: 'sub' }],
		['blockquote'],
		[{ list: 'ordered' }, { list: 'bullet'}, { indent: '-1' }, { indent: '+1' }],
		[ 'clean' ]
	],
}

export default function QuillComponent(props) {
  return (
    <ReactQuill theme="snow" modules={modules} value={props.value} onChange={(val) => {
      console.log(val)
      props.setValue(val)
    }}/>
  );
}