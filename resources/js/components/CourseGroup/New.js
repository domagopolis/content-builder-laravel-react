import axios from 'axios'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Error from '../Error'

const NewCourseGroup = () => {
  let history = useHistory();

  const [courseGroup, setCourseGroup] = useState({title: "", description: "", vet_package_id: ""});
  const [vetPackages, setVetPackages] = useState([]);
  const [errors, setErrors] = useState([]);
  
  useEffect (() => {
    fetch('/api/vet_packages').then((res) => res.json()).then((vetPackages) => setVetPackages(vetPackages))
  }, []);

  const onInputChange = (e) => {
    setCourseGroup({...courseGroup, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/course_groups', courseGroup)
      .then(response => {
        history.push('/course_groups/')
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
            <div className='card-header'>Create new Course Group</div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    id='title'
                    type='text'
                    className={`form-control ${!!errors['title'] ? 'is-invalid' : ''}`}
                    placeholder='Course group title'
                    name='title'
                    value={courseGroup.title}
                    onChange={ (e) => onInputChange(e)}
                  />
                  {(() => {
                    if (!!errors['title']) {
                      return <Error error={errors['title'][0]}/>
                    }
                  })()}
                </div>
                <div className='form-group'>
                  <textarea
                    id='description'
                    name='description'
                    className='form-control'
                    placeholder='Description'
                    value={courseGroup.description}
                    onChange={ (e) => onInputChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='vet_package_id'>Vet Package</label>
                  <select
                    id='vet_package_id'
                    name='vet_package_id'
                    className='form-control'
                    value={courseGroup.vet_package_id}
                    onChange={ (e) => onInputChange(e)}
                    >
                    <option value=''>Select one</option>
                    {vetPackages.map(vetPackage => (
                      <option value={vetPackage.id} key={vetPackage.id}>({vetPackage.id}) {vetPackage.course_name}</option>
                    ))}
                  </select>
                </div>
                <div className="btn-toolbar">
                  <button type="button" className='btn btn-danger mr-3' onClick={()=>{history.push('/course_groups/')}}>Cancel</button>
                  <button type="submit" className='btn btn-primary'>Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default NewCourseGroup