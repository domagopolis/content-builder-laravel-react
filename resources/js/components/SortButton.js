import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const SortButton = (props) => {
  console.log(props);
  if(false){
  return (
    <button className='btn'>
      <i className='fa fa-arrow-up'></i>
    </button>
  );
}else{
  return (
    <div></div>
  );
}
}

export default SortButton;
