import axios from 'axios'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Error from '../Error'

const NewCourse = () => {
  let history = useHistory();

  const [course, setCourse] = useState({title: "", duration: 0});
  const [vetPackages, setVetPackages] = useState([]);
  const [courseGroups, setCourseGroups] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect (() => {
    fetch('/api/vet_packages').then((res) => res.json()).then((vetPackages) => setVetPackages(vetPackages))
    fetch('/api/course_groups').then((res) => res.json()).then((courseGroups) => setCourseGroups(courseGroups))
  }, []);

  const onInputChange = (e) => {
    setCourse({...course, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/courses', course)
      .then(response => {
        history.push('/courses/')
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
            <div className='card-header'>Create Course</div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    id='title'
                    type='text'
                    className={`form-control ${!!errors['title'] ? 'is-invalid' : ''}`}
                    placeholder='Course title'
                    name='title'
                    value={course.title}
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
                    value={course.description}
                    onChange={ (e) => onInputChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='title'>Duration</label>
                  <input
                    id='duration'
                    type='number'
                    min='0'
                    className='form-control'
                    placeholder='Duration'
                    name='duration'
                    value={course.duration}
                    onChange={ (e) => onInputChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='vet_package_id'>Vet package</label>
                  <select
                    id='vet_package_id'
                    name='vet_package_id'
                    className='form-control'
                    value={course.vet_package_id}
                    onChange={ (e) => onInputChange(e)}
                    >
                    <option value=''>Select one</option>
                    {vetPackages.map(vetPackage => (
                      <option value={vetPackage.id} key={vetPackage.id}>({vetPackage.id}) {vetPackage.course_name}</option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='course_group_id'>Course group</label>
                  <select
                    id='course_group_id'
                    name='course_group_id'
                    className='form-control'
                    value={course.course_group_id}
                    onChange={ (e) => onInputChange(e)}
                    >
                    <option value=''>Select one</option>
                    {courseGroups.map(courseGroup => (
                      <option value={courseGroup.id} key={courseGroup.id}>({courseGroup.id}) {courseGroup.title}</option>
                    ))}
                  </select>
                </div>
                <div className="btn-toolbar">
                  <button type="button" className='btn btn-danger mr-3' onClick={()=>{history.push('/courses/')}}>Cancel</button>
                  <button type="submit" className='btn btn-primary'>Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default NewCourse
