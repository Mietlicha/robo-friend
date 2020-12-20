import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((user) => this.setState({ robots: user }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const filterRobot = this.state.robots.filter((robots) => {
      return robots.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    return !this.state.robots.length ? (
      <h1>loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1"> Robo friends !</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobot} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
