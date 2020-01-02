import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <h1>Multiplayer Memory Game</h1>
      </div>
    );
  }
}
const mapDispatchToProps = {};

const mapStateToProps = state => ({});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
