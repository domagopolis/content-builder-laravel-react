import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

const SingleCourse = (props) => {
  const [course, setCourse] = useState({title: "", code: "", description: "", course_units: []});
  const [units, setUnits] = useState([]);
  const [courseUnit, setCourseUnit] = useState({course_id: 0, unit_id: 0, unit: {}});

  useEffect (() => {
    fetch(`/api/courses/${props.match.params.id}`).then((res) => res.json()).then((course) => setCourse(course))
    fetch('/api/units').then((res) => res.json()).then((units) => setUnits(units))
  }, []);

  const onInputChange = (e) => {
    setCourseUnit({course_id: course.id, unit_id: parseInt(e.target.value), unit: units.find(unit => unit.id === parseInt(e.target.value))});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseUnit)
    };
    fetch('/api/course_units', requestOptions).then((res) => res.json()).then((courseUnit) => {
      setCourse({...course, course_units: course.course_units.concat(courseUnit)})
    })
  }

  const deleteCourseUnit = (courseUnitId) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`/api/course_units/${courseUnitId}`, requestOptions).then(response => {
      setCourse({...course, course_units: course.course_units.filter(course_unit => course_unit.id !== courseUnitId)})
    })
  }

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>({course.id}) {course.title}</div>
          <div className='card-body'>
            <p>{course.description}</p>

            <ul className='list-group mt-3'>
              {course.course_units.map(course_unit => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={course_unit.unit.id}
                >
                  <Link
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    to={`/unit/${course_unit.unit.id}`}
                    key={course_unit.unit.id}
                  >
                    ({course_unit.unit.id}) {course_unit.unit.title}
                  </Link>
                  <button className='btn' onClick={()=>{deleteCourseUnit(course_unit.id)}}>
                    <i className='fa fa-minus'></i>
                  </button>
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
                    <option value=''>Select one</option>
                    {units.map(unit => (
                      <option value={unit.id} key={unit.id}>({unit.id}) {unit.title}</option>
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

export default SingleCourse
