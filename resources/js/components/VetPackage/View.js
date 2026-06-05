import {useState, useEffect} from 'react'

const SingleVetPackage = (props) => {
  const [vetPackage, setVetPackage] = useState({});

  useEffect (() => {
    fetch(`/api/vet_packages/${props.match.params.id}`).then((res) => res.json()).then((vetPackage) => setVetPackage(vetPackage))
  }, []);

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>({vetPackage.id}) {vetPackage.course_name}</div>
          <div className='card-body'>
            <p>{vetPackage.description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default SingleVetPackage
