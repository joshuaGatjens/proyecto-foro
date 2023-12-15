import React, { Component } from 'react';

class NameUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      user: {
        name: '',
        email: ''
      }
    };
  }

  componentDidMount() {
    fetch('')
    .then(response => response.json())
    .then(data => this.setState({ user: data }));
    

  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleSave = () => {
    const { user } = this.state;
  
    const { name, email } = user; 
  
    fetch(`http://localhost:3001/api/v1/users/${user.id}/name`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: { name, email } }) 
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error al actualizar los datos');
    })
    .then(data => {
      this.setState({ user: data, editing: false });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  render() {
    const { editing, user } = this.state;

    return (
      <div>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={this.handleInputChange}
              disabled={!editing}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={this.handleInputChange}
              disabled={!editing}
            />
          </label>
          {editing ? (
            <button type="button" onClick={this.handleSave}>
              Guardar
            </button>
          ) : (
            <button type="button" onClick={this.handleEdit}>
              Editar
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default NameUser;
