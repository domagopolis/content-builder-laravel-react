import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);

  useEffect (() => {
    fetch('/api/activities').then((res) => res.json()).then((activities) => setActivities(activities))
  }, []);

  const deleteActivity = (activityId) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`/api/activities/${activityId}`, requestOptions).then(response => {
      setActivities(activities => activities.filter(activity => activity.id !== activityId))
    })
  }

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-header'>All Activities</div>
          <div className='card-body'>
            <Link className='btn btn-primary btn-sm mb-3' to='/activity/create'>
              Create new Activitity
            </Link>
            <ul className='list-group mt-3'>
              {activities.map(activity => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={activity.id}
                >
                  <Link
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    to={`/activity/${activity.id}`}
                    key={activity.id}
                  >
                    {activity.name}
                  </Link>
                  <Link
                    className='btn'
                    to={`/activity/edit-${activity.id}`}
                  >
                    <i className='fa fa-edit'></i>
                  </Link>
                  <button className='btn' onClick={()=>{deleteActivity(activity.id)}}>
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

export default ActivitiesList