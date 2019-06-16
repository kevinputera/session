import React from 'react';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      username: '',
      password: '',
    };
    this.usernameInputRef = null;
  }

  handleLogout = async () => {
    const logoutUrl = 'http://localhost:8080/logout';
    await fetch(logoutUrl, {
      method: 'POST',
      credentials: 'include',
    });
    this.toggleLogin(true);
    this.handleLoginClear();
  }

  handleLoginChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLoginClear = () => {
    this.setState({
      username: '',
      password: '',
    });
    this.usernameInputRef.focus();
  }

  assignUsernameInputRef = el => {
    this.usernameInputRef = el;
  }

  toggleLogin = showLogin => {
    this.setState({
      showLogin: showLogin,
    })
  }

  render() {
    const content = this.state.showLogin 
        ? <Login 
            username={this.state.username}
            password={this.state.password}
            assignUsernameInputRef={this.assignUsernameInputRef}
            handleClear={this.handleLoginClear}
            handleChange={this.handleLoginChange}
            toggleLogin={this.toggleLogin}
          />
        : <Dashboard />;

    // TODO: add status bar
    return (
      <div className="container mt-2">
        <nav className="navbar navbar-light bg-light rounded-top">
          <button 
            className=
              {this.state.showLogin 
                  ? "btn btn-outline-secondary" 
                  : "btn btn-outline-secondary active"}
            onClick={() => this.toggleLogin(false)}
          >
            Dashboard
          </button>
          <button 
            className=
              {this.state.showLogin
                  ? "btn btn-outline-secondary ml-auto active"
                  : "btn btn-outline-secondary ml-auto"}
            onClick={() => this.toggleLogin(true)}
          >
            Login
          </button>
          <button 
            className="btn btn-danger ml-1"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </nav>
        {content}
      </div>
    );
  }
}

export default App;
