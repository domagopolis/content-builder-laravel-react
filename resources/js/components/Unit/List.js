import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const UnitsList = () => {
  const [units, setUnits] = useState([]);

  useEffect (() => {
    fetch('/api/units').then((res) => res.json()).then((units) => setUnits(units))
  }, []);

  const deleteUnit = (unitId) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`/api/units/${unitId}`, requestOptions).then(response => {
      setUnits(units => units.filter(unit => unit.id !== unitId))
    })
  }

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>All Units</div>
          <div className='card-body'>
            <Link className='btn btn-primary btn-sm mb-3' to='/unit/create'>
              Create new Unit
            </Link>
            <ul className='list-group mt-3'>
              {units.map(unit => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={unit.id}
                >
                  <Link
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    to={`/unit/${unit.id}`}
                    key={unit.id}
                  >
                    {unit.title}
                  </Link>
                  <Link
                    className='btn'
                    to={`/unit/edit-${unit.id}`}
                  >
                    <i className='fa fa-edit'></i>
                  </Link>
                  <button className='btn' onClick={()=>{deleteUnit(unit.id)}}>
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

export default UnitsList
