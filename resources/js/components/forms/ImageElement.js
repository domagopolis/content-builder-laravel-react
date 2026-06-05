import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const ImageElement = (props) => {
  const [attributes] = useState(props.attributes);

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
        case 'src':
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
        case 'alt':
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

export default ImageElement;
