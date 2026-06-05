import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

const SingleCourseGroup = (props) => {
  const [courseGroup, setCourseGroup] = useState({title: "", description: "", courses: []});
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({course_group_id: 0});

  useEffect (() => {
    fetch(`/api/course_groups/${props.match.params.id}`).then((res) => res.json()).then((courseGroup) => setCourseGroup(courseGroup))
    fetch('/api/courses').then((res) => res.json()).then((courses) => setCourses(courses))
  }, []);

  const onInputChange = (e) => {
    setCourse(courses.find(course => course.id === parseInt(e.target.value)));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    course.course_group_id = courseGroup.id;

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
    };
    fetch(`/api/courses/${course.id}`, requestOptions).then(res => res.json()).then((course) => {
      setCourseGroup({...courseGroup, courses: courseGroup.courses.concat(course)})
    })
  }

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>({courseGroup.id}) {courseGroup.title}</div>
          <div className='card-body'>
            <p>{courseGroup.description}</p>

            <ul className='list-group mt-3'>
              {courseGroup.courses.map(course => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={course.id}
                >
                  <Link
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    to={`/course/${course.id}`}
                    key={course.id}
                  >
                    ({course.id}) {course.title}
                  </Link>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit}>
              <div className='form-group mt-3'>
                <div className='input-group'>
                  <select
                    id='id'
                    name='id'
                    className='form-control'
                    onChange={ (e) => onInputChange(e)}
                    >
                    <option value=''>Select course</option>
                    {courses.map(course => (
                      <option value={course.id} key={course.id}>({course.id}) {course.title}</option>
                    ))}
                  </select>
                  <div className='input-group-append'>
                    <button type='submit' className='btn btn-primary'>Add</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default SingleCourseGroup
