import React from 'react';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
    };
  }

  handleLogout = async () => {
    const logoutUrl = 'http://localhost:8080/logout';
    await fetch(logoutUrl, {
      method: 'POST',
      credentials: 'include',
    });
    this.toggleLogin(true);
  }

  toggleLogin = showLogin => {
    this.setState({
      showLogin: showLogin,
    })
  }

  render() {
    const content = this.state.showLogin 
        ? <Login toggleLogin={this.toggleLogin} />
        : <Dashboard toggleLogin={this.toggleLogin} handleLogout={this.handleLogout} />;

    return (
      <div className="page-container">
        <div className="status-bar"></div>
        <div className="error-bar"></div>
        {content}
      </div>
    );
  }
}

export default App;
