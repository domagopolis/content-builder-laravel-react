import {useState, useEffect} from 'react'

const SingleUnit = (props) => {
  const [unit, setUnit] = useState({title: "", code: "", description: ""});

  useEffect (() => {
    fetch(`/api/units/${props.match.params.id}`).then((res) => res.json()).then((unit) => setUnit(unit))
  }, []);

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>({unit.id}) {unit.title}</div>
          <div className='card-body'>
            <p>{unit.description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default SingleUnit
