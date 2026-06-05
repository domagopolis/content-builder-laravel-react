import {useState, useEffect} from 'react'

const HeadingElement = (props) => {
  const [attributes] = useState(props.attributes);
  const [errors] = useState(props.errors);

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
              {(() => {console.log(props.errors[attribute.name], attribute.name);
                if (!!errors[attribute.name]) {
                  return <Error error={errors[attribute.name][0]}/>
                }
              })()}
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
              {(() => {console.log(props.errors[attribute.name], attribute.name);
                if (!!errors[attribute.name]) {
                  return <Error error={errors[attribute.name][0]}/>
                }
              })()}
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

export default HeadingElement;
