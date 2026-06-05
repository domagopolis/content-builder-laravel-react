import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect (() => {
    fetch('/api/courses').then((res) => res.json()).then((courses) => setCourses(courses))
  }, []);

  const deleteCourse = (courseId) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`/api/courses/${courseId}`, requestOptions).then(response => {
      setCourses(courses => courses.filter(course => course.id !== courseId))
    })
  }

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>All courses</div>
          <div className='card-body'>
            <Link className='btn btn-primary btn-sm mb-3' to='/course/create'>
              Create new Course
            </Link>
            <ul className='list-group mt-3'>
              {courses.map(course => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={course.id}
                >
                  <Link
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    to={`/course/${course.id}`}
                    key={course.id}
                  >
                    {course.title}
                  </Link>
                  <Link
                    className='btn'
                    to={`/course/edit-${course.id}`}
                  >
                    <i className='fa fa-edit'></i>
                  </Link>
                  <button className='btn' onClick={()=>{deleteCourse(course.id)}}>
                    <i className='fa fa-trash'></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default CoursesList
