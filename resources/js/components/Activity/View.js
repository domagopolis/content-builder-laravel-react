import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SortButton from '../SortButton'
import Error from '../Error'

const SingleActivity = (props) => {
  const [activity, setActivity] = useState({name: "", description: "", elements: []});
  const [element, setElement] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect (() => {
    fetch(`/api/activities/${props.match.params.id}`).then((res) => res.json()).then((activity) => setActivity(activity))
  }, []);

  const onInputChange = (e) => {
    setElement({...element, [e.target.name]: e.target.value, activity_id: activity.id});
  }

  const handleOrderUp = (elementOrder) => {
    elementOrder.order--;
    activity.elements = activity.elements.filter(element => element.id !== elementOrder.id)
    activity.elements.splice(activity.elements.findIndex(element => element.order === elementOrder.order), 0, elementOrder)
    activity.elements = activity.elements.map(element => element.id !== elementOrder.id && element.order === elementOrder.order ? { ...element, order: element.order+1 } : element)
    setActivity({...activity, elements: activity.elements})

    axios.put(`/api/elements/${elementOrder.id}`, elementOrder).then(response => {
      fetch(`/api/activities/${elementOrder.activity_id}`).then((res) => res.json()).then((activity) => setActivity({...activity, elements: activity.elements}))
    })
  }

  const handleOrderDown = (elementOrder) => {
    elementOrder.order++;
    activity.elements = activity.elements.filter(element => element.id !== elementOrder.id)
    activity.elements.splice(activity.elements.findIndex(element => element.order === elementOrder.order)+1, 0, elementOrder)
    activity.elements = activity.elements.map(element => element.id !== elementOrder.id && element.order === elementOrder.order ? { ...element, order: element.order-1 } : element)
    setActivity({...activity, elements: activity.elements})
    
    axios.put(`/api/elements/${elementOrder.id}`, elementOrder).then(response => {
     fetch(`/api/activities/${elementOrder.activity_id}`).then((res) => res.json()).then((activity) => setActivity({...activity, elements: activity.elements}))
    })
  }

  const deleteElement = (elementId) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`/api/elements/${elementId}`, requestOptions).then(response => {
      setActivity({...activity, elements: activity.elements.filter(element => element.id !== elementId)})
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/elements', element)
      .then(response => {
        element.id = response.data.id;
        element.order = response.data.order;
        setActivity({...activity, elements: activity.elements.concat(element)})
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
          <div className='card-header'>{activity.name}</div>
          <div className='card-body'>
            <p>{activity.description}</p>

            <ul className='list-group mt-3'>
              {activity.elements.map(element => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={element.id}
                >
                  <Link
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    to={`/element/${element.id}`}
                    key={element.id}
                  >
                    {element.name}
                  </Link>
                  <button className='btn' disabled={element.order <= 1} onClick={()=>{handleOrderUp(element)}}>
                    <i className='fa fa-arrow-up'></i>
                  </button>
                  <button className='btn' disabled={element.order >= activity.elements.length}  onClick={()=>{handleOrderDown(element)}}>
                    <i className='fa fa-arrow-down'></i>
                  </button>
                  <Link
                    className='btn'
                    to={`/element/edit-${element.id}`}
                  >
                    <i className='fa fa-edit'></i>
                  </Link>
                  <button className='btn' onClick={()=>{deleteElement(element.id)}}>
                    <i className='fa fa-trash'></i>
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit}>
              <div className='form-group mt-3'>
                <div className='input-group'>
                  <select
                    id='name'
                    name='name'
                    className='form-control'
                    value={element.name}
                    onChange={ (e) => onInputChange(e)}
                    >
                    <option value=''>Select one</option>
                    <option value='heading'>Heading</option>
                    <option value='text'>Text</option>
                    <option value='image'>Image</option>
                  </select>
                  <div className='input-group-append'>
                    <button type='submit' className='btn btn-primary'>Create</button>
                  </div>
                </div>
                {(() => {
                  if (!!errors['name']) {
                    return <Error error={errors['name'][0]}/>
                  }
                })()}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default SingleActivity