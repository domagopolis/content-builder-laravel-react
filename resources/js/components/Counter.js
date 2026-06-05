import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Counter = () => {
  const [countValue, setCounter] = useState(0);
  useEffect (() => {console.log(countValue) },[countValue]);
  return (
  <>
    count {countValue} <button onClick={()=>{setCounter(countValue+1)}}>+1</button>
  </>
)}

export default Counter
