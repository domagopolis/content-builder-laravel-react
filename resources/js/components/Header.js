import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>Builder</Link>
      <Link className='navbar-brand' to='/vet_packages/'>Vet Packages</Link>
      <Link className='navbar-brand' to='/course_groups/'>Course Groups</Link>
      <Link className='navbar-brand' to='/courses/'>Courses</Link>
      <Link className='navbar-brand' to='/units/'>Units</Link>
      <Link className='navbar-brand' to='/activities/'>Activities</Link>
    </div>
  </nav>
)

export default Header
