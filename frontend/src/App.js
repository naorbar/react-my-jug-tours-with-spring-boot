import React, { Component } from 'react';
import './App.css';
import Groups from './components/Groups';

class App extends Component {

	constructor() {
		super();
		this.state = {
			groups: []
		}
	}

	componentDidMount() {
		this.callAsyncFromServer();
		this.loadGroupsFromServer();
	}

	callAsyncFromServer() {
		console.log("Calling async request on server...");
		fetch("/async")
      .then(res => res)
      .then(
        (result) => {
          alert("Result: " + result);
        },
        (error) => {
					alert("Error Result: " + error);
        }
      )
	}

	loadGroupsFromServer() {
		console.log("Loading groups from server...");
		// Get data from the server:
		// It works when adding this line to package.json:
		//  "proxy": "http://localhost:8080",
		fetch("/groups")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            groups: result
          });
        },
        (error) => {
          console.log("Failed to get data from the server: " + error);
        }
      )
	}

	render() {
		return (
				<div className="App">
					<Groups groups={this.state.groups} loadGroupsFromServer={this.loadGroupsFromServer.bind(this)}/>
				</div>
		);
	}
}

export default App;
