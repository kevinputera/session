import React, { Fragment } from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.usernameInputRef = null;
  }

  handleSubmit = async e => {
    e.preventDefault();

    const loginUrl = 'http://localhost:8080/login';
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(this.state), 
      credentials: 'include',
    });
    const json = await res.json();

    if (json.body.authenticate) {
      this.props.toggleLogin(false);
    } else {
      this.handleClear();
    }
  }

  handleClear = () => {
    this.setState({
      username: '',
      password: '',
    });
    this.usernameInputRef.focus();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <Fragment>
        <button onClick={() => this.props.toggleLogin(false)}>Dashboard</button>
        
        <form>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username"
            name="username"
            maxLength="30" 
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            ref={el => this.usernameInputRef = el}
            autoFocus
          />

          <br />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            maxLength="30" 
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <br />

          <button type="submit" onClick={this.handleSubmit}>Submit</button>
          <button type="reset" onClick={this.handleClear}>Clear</button>
        </form>
      </Fragment>
    )
  }
}

export default Login;
