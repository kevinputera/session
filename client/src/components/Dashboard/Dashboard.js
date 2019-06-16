import React from 'react';

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
      items = this.state.items.map(item => 
        <li key={item} className="list-group-item">{item}</li>
      );
    }
    return (
      <div className="border rounded-bottom p-4">
        <p className="lead">
          {this.state.name 
            ? `Greetings, ${this.state.name}!` 
            : 'You must login before continuing.'}
        </p>

        <button 
          onClick={this.handleFoods} 
          disabled={!this.state.name}
          className="btn btn-outline-secondary"
        >
          Get Foods!
        </button>
        <button 
          onClick={this.handleMovies}
          disabled={!this.state.name}
          className="btn btn-outline-secondary ml-1"
        >
          Get Movies!
        </button>

        <ul className="list-group mt-3">
          {items}
        </ul>
      </div>
    );
  }
}

export default Dashboard;
