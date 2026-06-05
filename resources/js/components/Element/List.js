import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ElementsList extends Component {
  constructor () {
    super()
    this.state = {
      elements: []
    }
  }

  componentDidMount () {
    axios.get('/api/elements').then(response => {
      this.setState({
        elements: response.data
      })
    })
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDeleteElement (element) {
    axios.delete(`/api/elements/${element.id}`, element).then(response => {
      axios.get('/api/elements').then(response => {
        this.setState({
          elements: response.data
        })
      })
    })
  }

  handleOrderUpElement (element) {
    element.order--;
    axios.put(`/api/elements/${element.id}`, element).then(response => {
      axios.get('/api/elements').then(response => {
        this.setState({
          elements: response.data
        })
      })
    })
  }

  handleOrderDownElement (element) {
    element.order++;
    axios.put(`/api/elements/${element.id}`, element).then(response => {
      axios.get('/api/elements').then(response => {
        this.setState({
          elements: response.data
        })
      })
    })
  }

  render () {
    const { elements } = this.state;
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All Elements</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                  Create new Element
                </Link>
                <ul className='list-group list-group-flush'>
                  <li
                    className='list-group-item d-flex justify-content-between align-items-center'
                    key={element.id}
                  >
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`/${element.id}`}
                      key={element.id}
                    >
                      {element.name} ({element.order})
                    </Link>
                    <Link
                      className='btn'
                      to={`/edit-${element.id}`}
                    >
                      <i className='fa fa-edit'></i>
                    </Link>
                    <input
                      id='order'
                      type='hidden'
                      name='order'
                      value={element.order}
                      onChange={this.handleFieldChange}
                    />
                    <button className='btn' onClick={this.handleOrderUpElement.bind(this,element)}>
                      <i className='fa fa-arrow-up'></i>
                    </button>
                    <button className='btn' onClick={this.handleOrderDownElement.bind(this,element)}>
                      <i className='fa fa-arrow-down'></i>
                    </button>
                    <button className='btn' onClick={this.handleDeleteElement.bind(this,element)}>
                      <i className='fa fa-trash'></i>
                    </button>
                  </li>
                </ul>
                <form>
                  <div className='input-group'>
                    <select className='form-control'>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                    <div className='input-group-append'>
                      <button className='btn btn-primary'>Create</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ElementsList
