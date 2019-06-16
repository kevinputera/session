import React, { Fragment } from 'react';

class Login extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();

    const loginUrl = 'http://localhost:8080/login';
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: this.props.username,
        password: this.props.password,
      }), 
      credentials: 'include',
    });
    const json = await res.json();

    if (json.body.authenticate) {
      this.props.toggleLogin(false);
    } else {
      this.props.handleClear();
    }
  }

  render() {
    return (
      <Fragment>
        <form className="border rounded-bottom p-4">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              name="username"
              maxLength="30" 
              placeholder="Enter username"
              value={this.props.username}
              onChange={this.props.handleChange}
              ref={this.props.assignUsernameInputRef}
              className="form-control"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              maxLength="30" 
              placeholder="password"
              value={this.props.password}
              onChange={this.props.handleChange}
              className="form-control"
            />
          </div>

          <button 
            type="submit" 
            onClick={this.handleSubmit}
            className="btn btn-secondary"
          >
            Submit
          </button>
          <button 
            type="reset" 
            onClick={this.props.handleClear}
            className="btn btn-danger ml-1"
          >
            Clear
          </button>
        </form>
      </Fragment>
    )
  }
}

export default Login;
