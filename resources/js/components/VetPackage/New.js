import axios from 'axios'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Error from '../Error'

const NewVetPackage = () => {
  let history = useHistory();

  const [vetPackage, setVetPackage] = useState({course_name: ""});
  const [errors, setErrors] = useState([]);

  const onInputChange = (e) => {
    setVetPackage({...vetPackage, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/vet_packages', vetPackage)
      .then(response => {
        history.push('/vet_packages/')
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
            <div className='card-header'>Create new Vet Package</div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='course_name'>Course name</label>
                  <input
                    id='course_name'
                    type='text'
                    className={`form-control ${!!errors['course_name'] ? 'is-invalid' : ''}`}
                    placeholder='Course group title'
                    name='course_name'
                    value={vetPackage.course_name}
                    onChange={ (e) => onInputChange(e)}
                  />
                  {(() => {
                    if (!!errors['course_name']) {
                      return <Error error={errors['course_name'][0]}/>
                    }
                  })()}
                </div>
                <div className="btn-toolbar">
                  <button type="button" className='btn btn-danger mr-3' onClick={()=>{history.push('/vet_packages/')}}>Cancel</button>
                  <button type="submit" className='btn btn-primary'>Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default NewVetPackage