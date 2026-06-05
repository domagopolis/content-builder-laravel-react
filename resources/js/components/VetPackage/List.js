import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const VetPackagesList = () => {
  const [vetPackages, setVetPackages] = useState([]);

  useEffect (() => {
    fetch('/api/vet_packages').then((res) => res.json()).then((vetPackages) => setVetPackages(vetPackages))
  }, []);

  const deleteVetPackage = (vetPackageId) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`/api/vet_packages/${vetPackageId}`, requestOptions).then(response => {
      setVetPackages(vetPackages => vetPackages.filter(vetPackage => vetPackage.id !== vetPackageId))
    })
  }

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>All Vet Packages</div>
          <div className='card-body'>
            <Link className='btn btn-primary btn-sm mb-3' to='/vet_package/create'>
              Create new Vet Package
            </Link>
            <ul className='list-group mt-3'>
              {vetPackages.map(vetPackage => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={vetPackage.id}
                >
                  <Link
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    to={`/vet_package/${vetPackage.id}`}
                    key={vetPackage.id}
                  >
                    {vetPackage.course_name}
                  </Link>
                  <Link
                    className='btn'
                    to={`/vet_package/edit-${vetPackage.id}`}
                  >
                    <i className='fa fa-edit'></i>
                  </Link>
                  <button className='btn' onClick={()=>{deleteVetPackage(vetPackage.id)}}>
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

export default VetPackagesList
