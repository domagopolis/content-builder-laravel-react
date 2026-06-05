import {useState} from 'react'

const Error = (props) => {
  const [error] = useState(props.error);

  return (
    <span className='invalid-feedback'>
        <strong>{error}</strong>
    </span>
  )
}

export default Error;