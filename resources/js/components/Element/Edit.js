import axios from 'axios'
import React, { Component } from 'react'

class EditElement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      element: {},
      name: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleUpdateElement = this.handleUpdateElement.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
    const elementId = this.props.match.params.id

    axios.get(`/api/elements/${elementId}`).then(response => {
      this.setState({
        element: response.data,
        name: response.data.name
      })
    })
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleUpdateElement (event) {
    event.preventDefault()

    const { history } = this.props

    const element = {
      id: this.state.element.id,
      name: this.state.name,
      order: this.state.element.order
    }

    axios.put(`/api/elements/${this.state.element.id}`, element)
      .then(response => {
        // redirect to the homepage
        history.push(`/${response.data.activity_id}`)
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Edit element</div>
              <div className='card-body'>
                <form onSubmit={this.handleUpdateElement}>
                  <div className='form-group'>
                    <label htmlFor='name'>Element name</label>
                    <input
                      id='name'
                      type='text'
                      className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                      name='name'
                      value={this.state.name}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('name')}
                  </div>
                  <button className='btn btn-primary'>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditElement
