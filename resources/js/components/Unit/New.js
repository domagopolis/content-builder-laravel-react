import axios from 'axios'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Error from '../Error'

const NewUnit = () => {
  let history = useHistory();

  const [unit, setUnit] = useState({title: "", code: "", description: ""});
  const [errors, setErrors] = useState({});

  const onInputChange = (e) => {
    setUnit({...unit, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/units', unit)
      .then(response => {
        history.push('/units/')
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      })
  }

  return (
    <div className='container py-4'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>Create new Unit</div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    id='title'
                    type='text'
                    className={`form-control ${!!errors['title'] ? 'is-invalid' : ''}`}
                    placeholder='Unit title'
                    name='title'
                    value={unit.title}
                    onChange={ (e) => onInputChange(e)}
                  />
                  {(() => {console.log(errors);
                    if (!!errors['title']) {
                      return <Error error={errors['title'][0]}/>
                    }
                  })()}
                </div>
                <div className='form-group'>
                  <label htmlFor='title'>Code</label>
                  <input
                    id='code'
                    type='text'
                    className={`form-control ${!!errors['code'] ? 'is-invalid' : ''}`}
                    placeholder='Unit code'
                    name='code'
                    value={unit.code}
                    onChange={ (e) => onInputChange(e)}
                  />
                  {(() => {
                    if (!!errors['code']) {
                      return <Error error={errors['code'][0]}/>
                    }
                  })()}
                </div>
                <div className='form-group'>
                  <textarea
                    id='description'
                    name='description'
                    className='form-control'
                    placeholder='Description'
                    value={unit.description}
                    onChange={ (e) => onInputChange(e)}
                  />
                </div>
                <div className="btn-toolbar">
                  <button type="button" className='btn btn-danger mr-3' onClick={()=>{history.push('/units/')}}>Cancel</button>
                  <button type="submit" className='btn btn-primary'>Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default NewUnit