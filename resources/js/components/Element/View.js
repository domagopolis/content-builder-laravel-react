import {useState, useEffect} from 'react'
import HeadingElement from '../forms/HeadingElement'
import TextElement from '../forms/TextElement'
import ImageElement from '../forms/ImageElement'
import Error from '../Error'

const SingleElement = (props) => {
  const [element, setElement] = useState({name: "", element_attributes: []});
  const [errors, setErrors] = useState({});

  useEffect (() => {
    fetch(`/api/elements/${props.match.params.id}`).then((res) => res.json()).then((element) => setElement(element))
  }, []);

  const onInputChange = (e) => {
    setElement({...element, element_attributes: element.element_attributes.map((attribute) => {if (attribute.name === e.target.name) attribute.value = e.target.value; return attribute;})});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    element.element_attributes.map(attribute => {
      axios.put(`/api/element_attibutes/${attribute.id}`, attribute)
        .then(response => {
          ;
        })
        .catch((error) => {
          //setErrors(errors.push(error.response.data.errors));
          setErrors({...errors, [attribute.name]: error.response.data.errors.value});
        })

      /*const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(attribute)
      };
      fetch(`/api/element_attibutes/${attribute.id}`, requestOptions).then(response => {})*/
    });
  }

  return (
  <div className='container py-4'>
    <div className='row justify-content-center'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-header'>{element.name}</div>
          <div className='card-body'>
            {(() => {
              switch (element.name) {
                case 'heading':
                  return <HeadingElement attributes={element.element_attributes} onInputChange={onInputChange} handleSubmit={handleSubmit} errors={errors} />
                case 'text':
                  return <TextElement attributes={element.element_attributes} onInputChange={onInputChange} handleSubmit={handleSubmit} errors={errors} />
                case 'image':
                  return <ImageElement attributes={element.element_attributes} onInputChange={onInputChange} handleSubmit={handleSubmit} errors={errors} />
                default:
                  return null
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  </div>
)}

/*class SingleElement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      element: {},
      attributes: [],
      name: '',
      value: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
    const elementId = this.props.match.params.id

    axios.get(`/api/elements/${elementId}`).then(response => {
      this.setState({
        element: response.data,
        attributes: response.data.element_attributes
      })
    })
  }

  handleFieldChange (event) {
    var name = event.target.name;
    var value = event.target.value;

    this.setState(state => {
      const attributes = state.attributes.map((attribute) => {
        if (attribute.name === name) {
          attribute.value = value;
        }
        return attribute;
      });

      return {
        attributes,
      };
    });
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

  handleSubmit (event) {
    event.preventDefault();

    const { history } = this.props

    const attributes = this.state.attributes.map((attribute) => {
      return attribute;
    });

    this.setState({
      errors: []
    })

    const promises = [];
    attributes.map(attribute => {
      const promise = axios.put(`/api/element_attibutes/${attribute.id}`, attribute)
        .catch(error => {
          var errors = {...this.state.errors};
          errors[attribute.name] = error.response.data.errors.value;
          this.setState({errors});
        });
      promises.push(promise);
    });

    axios.all(promises)
      .then(axios.spread((...res) => {
        history.push(`/${this.state.element.activity_id}`);
      }))
      .catch((error) => {
        this.setState({
          errors: error.response.data.errors
        })
      });
  }

  handleCancel (event) {
    event.preventDefault();
    const { history } = this.props;
    history.push(`/${this.state.element.activity_id}`);
  }

  renderFormAttribute (element, attributes) {
    switch (element.name) {
      case 'heading':
        return <HeadingElement attributes={attributes} handleFieldChange={this.handleFieldChange} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} hasErrorFor={this.hasErrorFor} renderErrorFor={this.renderErrorFor} />;
      case 'text':
        return <TextElement attributes={attributes} handleFieldChange={this.handleFieldChange} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} hasErrorFor={this.hasErrorFor} renderErrorFor={this.renderErrorFor} />;
      case 'image':
        return <ImageElement attributes={attributes} handleFieldChange={this.handleFieldChange} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} hasErrorFor={this.hasErrorFor} renderErrorFor={this.renderErrorFor} />;
      default:
        return null;
    }
  }

  render () {
    const { element, attributes } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{element.name}</div>
              <div className='card-body'>
                {this.renderFormAttribute(element, attributes)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}*/

export default SingleElement
