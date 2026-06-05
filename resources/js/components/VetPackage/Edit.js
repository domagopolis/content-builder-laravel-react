import axios from 'axios'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Error from '../Error'

const EditVetPackage = (props) => {
  let history = useHistory();

  const [vetPackage, setVetPackage] = useState({course_name: ""});
  const [errors, setErrors] = useState([]);

  useEffect (() => {
    fetch(`/api/vet_packages/${props.match.params.id}`).then((res) => res.json()).then((vetPackage) => setVetPackage(vetPackage))
  }, []);

  const onInputChange = (e) => {
    setVetPackage({...vetPackage, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`/api/vet_packages/${vetPackage.id}`, vetPackage)
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
            <div className='card-header'>Edit Vet Package</div>
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
                  <button type="submit" className='btn btn-primary'>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default EditVetPackage