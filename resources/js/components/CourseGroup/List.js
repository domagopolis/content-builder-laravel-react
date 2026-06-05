import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const CourseGroupsList = () => {
  const [courseGroups, setCourseGroups] = useState([]);

  useEffect (() => {
    fetch('/api/course_groups').then((res) => res.json()).then((courseGroups) => setCourseGroups(courseGroups))
  }, []);

  const deleteCourseGroup = (courseGroupId) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`/api/course_groups/${courseGroupId}`, requestOptions).then(response => {
      setCourseGroups(courseGroups => courseGroups.filter(courseGroup => courseGroup.id !== courseGroupId))
    })
  }

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>All Course Groups</div>
          <div className='card-body'>
            <Link className='btn btn-primary btn-sm mb-3' to='/course_group/create'>
              Create new Course Group
            </Link>
            <ul className='list-group mt-3'>
              {courseGroups.map(courseGroup => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={courseGroup.id}
                >
                  <Link
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    to={`/course_group/${courseGroup.id}`}
                    key={courseGroup.id}
                  >
                    {courseGroup.title}
                  </Link>
                  <Link
                    className='btn'
                    to={`/course_group/edit-${courseGroup.id}`}
                  >
                    <i className='fa fa-edit'></i>
                  </Link>
                  <button className='btn' onClick={()=>{deleteCourseGroup(courseGroup.id)}}>
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

export default CourseGroupsList
