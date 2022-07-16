import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        this.modules = {
            toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'},
                    {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']
            ]
        };

        this.formats = [
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "align",
            "strike",
            "script",
            "blockquote",
            "background",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "color",
            "code-block"
        ];

        this.state = {
            comments: ''
        }

        this.rteChange = this.rteChange.bind(this);
    }

    rteChange = (content, delta, source, editor) => {
        console.log(editor.getHTML()); // rich text
        console.log(editor.getText()); // plain text
        console.log(editor.getLength()); // number of characters
    }

    render() {
        return (
            <div>
                <ReactQuill theme="snow"  modules={this.modules}
                            formats={this.formats} onChange={this.rteChange}
                            value={this.state.comments || ''}/>
            </div>
        );
    }

}

export default RichTextEditor;