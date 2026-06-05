import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const ElementAttributes = (props) => {
  if(true){
  return (
    <ul className='list-group mt-3'>
      {attributes.map(attribute => (
        <li
          className='list-group-item d-flex justify-content-between align-items-center'
          key={attribute.id}
        >
          {attribute.name} - ({attribute.value})
        </li>
      ))}
    </ul>
  );
}else{
  return (
    <div></div>
  );
}
}

export default ElementAttributes;
