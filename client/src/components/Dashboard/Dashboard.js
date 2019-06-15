import React, { Fragment } from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      items: null,
    }
  }

  async componentDidMount() {
    const dashboardUrl = 'http://localhost:8080/'
    const res = await fetch(dashboardUrl, {
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    }); 
    const json = await res.json();

    if (!json.body.authenticate) {
      this.setState({
        name: null,
        items: null,
      });
      return;
    }

    this.setState({
      name: json.body.name,
    })
  }

  handleFoods = async () => {
    const foodsUrl = 'http://localhost:8080/foods';
    const res = await fetch(foodsUrl, {
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });
    const json = await res.json();

    this.setState({
      items: json.body.foods,
    });
  }

  handleMovies = async () => {
    const moviesUrl = 'http://localhost:8080/movies';
    const res = await fetch(moviesUrl, {
      headers: {
        'Accept': 'applicatioin/json',
      },
      credentials: 'include',
    });
    const json = await res.json();

    this.setState({
      items: json.body.movies,
    });
  }

  render() {
    let items;
    if (this.state.items) {
      items = this.state.items.map(item => <li>{item}</li>);
    }
    return (
      <Fragment>
        <button onClick={() => this.props.toggleLogin(true)}>Login</button>
        <button onClick={this.props.handleLogout}>Logout</button>

        <div className="dashboard-message">
          {this.state.name 
            ? `Greetings, ${this.state.name}` 
            : 'You must login before continuing.'}
        </div>

        <button onClick={this.handleFoods}>Get Foods!</button>
        <button onClick={this.handleMovies}>Get Movies!</button>

        <ul>
          {items}
        </ul>
      </Fragment>
    );
  }
}

export default Dashboard;
