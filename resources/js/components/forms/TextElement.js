import {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { EditorJS } from "@editorjs/editorjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const TextElement = (props) => {
  const [attributes] = useState(props.attributes);
  const [editorState] = useState({});
  const ref = useRef();
  const editor = EditorJS('editorjs');

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS();
    }
  })

  return (
  <form onSubmit={props.handleSubmit}>
    {attributes.map(attribute => {
      switch (attribute.name) {
        case 'title':
          return (
            <div className='form-group' key={attribute.id}>
              <label htmlFor={attribute.name} style={{textTransform: 'capitalize'}}>{attribute.name}</label>
              <input
                id={attribute.name}
                type='text'
                name={attribute.name}
                className='form-control'
                placeholder='Attribute value'
                value={attribute.value}
                onChange={ (e) => props.onInputChange(e)}
              />
            </div>
          )
        case 'description':
          return (
            <div className='form-group' key={attribute.id}>
              <label htmlFor={attribute.name} style={{textTransform: 'capitalize'}}>{attribute.name}</label>
              <textarea
                id={attribute.name}
                name={attribute.name}
                className='form-control'
                placeholder='Attribute value'
                value={attribute.value}
                onChange={ (e) => props.onInputChange(e)}
              />
            </div>
          )
        default:
          return null
      }
    })}
    <div className="btn-toolbar">
      <button type="button" className='btn btn-danger mr-3'>Cancel</button>
      <button type="submit" className='btn btn-primary'>Update</button>
    </div>
  </form>
)}

/*class TextElement extends Component {
  constructor (props) {
    super(props);
    this.state = {
      attributes: this.props.attributes,
      editorState: EditorState.createEmpty(),
    }
  }

  onEditorStateChange (editorState) {
    this.setState({
      editorState,
    });
  };

  switchAttribute (attribute){
    switch (attribute.name) {
      case 'title':
        return (
          <div className='form-group' key={attribute.id}>
            <label htmlFor={attribute.name} style={{textTransform: 'capitalize'}}>{attribute.name}</label>
            <input
              id={attribute.name}
              type='text'
              name={attribute.name}
              className={`form-control ${this.props.hasErrorFor(attribute.name) ? 'is-invalid' : ''}`}
              placeholder='Attribute value'
              value={attribute.value}
              onChange={this.props.handleFieldChange}
            />
            {this.props.renderErrorFor(attribute.name)}
          </div>
        );
      case 'description':
        const { editorState } = this.state;
        return (
          <div className='form-group' key={attribute.id}>
            <label htmlFor={attribute.name} style={{textTransform: 'capitalize'}}>{attribute.name}</label>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.props.handleFieldChange}
            />
            <textarea
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
            <textarea
              id={attribute.name}
              name={attribute.name}
              className={`form-control ${this.props.hasErrorFor(attribute.name) ? 'is-invalid' : ''}`}
              placeholder='Attribute value'
              value={attribute.value}
              onChange={this.props.handleFieldChange}
            />
            {this.props.renderErrorFor(attribute.name)}
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        {this.state.attributes.map(attribute => (
          this.switchAttribute(attribute)
        ))}
        <div className="btn-toolbar">
          <button type="button" className='btn btn-danger mr-3' onClick={this.props.handleCancel}>Cancel</button>
          <button type="submit" className='btn btn-primary'>Update</button>
        </div>
      </form>
    );
  }
}*/

export default TextElement;
