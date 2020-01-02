import "./Stats.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store/Reducer";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div align="center">
        <div className="stats">
          <p>Ještě lze vybrat: {this.props.left}</p>
        </div>
        <button type="button" disabled={this.props.passTurnEn} onClick={() => this.props.passTurn()}> Pass turn </button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  passTurn: actionCreators.passTurn
};

const mapStateToProps = state => ({
  left: state.maxTurned - state.selected.length,
  passTurnEn: state.passTurnEn
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
