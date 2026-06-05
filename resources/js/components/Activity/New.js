import axios from 'axios'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Error from '../Error'

const NewActivity = () => {
  let history = useHistory();

  const [activity, setActivity] = useState({name: "", description: ""});
  const [errors, setErrors] = useState({});

  const onInputChange = (e) => {
    setActivity({...activity, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/activities', activity)
      .then(response => {
        history.push('/')
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
            <div className='card-header'>Create new Activity</div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <input
                    id='name'
                    type='text'
                    className={`form-control ${!!errors['name'] ? 'is-invalid' : ''}`}
                    placeholder='Activity name'
                    name='name'
                    value={activity.name}
                    onChange={ (e) => onInputChange(e)}
                  />
                  {(() => {
                    if (!!errors['name']) {
                      return <Error error={errors['name'][0]}/>
                    }
                  })()}
                </div>
                <div className='form-group'>
                  <textarea
                    id='description'
                    className='form-control'
                    name='description'
                    value={activity.description}
                    onChange={ (e) => onInputChange(e)}
                    placeholder='Description'
                  />
                </div>
                <div className="btn-toolbar">
                  <button type="button" className='btn btn-danger mr-3' onClick={()=>{history.push('/activities/')}}>Cancel</button>
                  <button type="submit" className='btn btn-primary'>Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default NewActivity