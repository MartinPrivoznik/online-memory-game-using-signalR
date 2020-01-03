import "./Stats.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store/Reducer";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {player: ""};
  }

  componentDidMount = () => {
    this.props.connection.on('TurnBackAll', () => {
      this.props.passTurnEnemy();
    });
  }

  render() {
    return (
      <div align="center">
        <div className="stats">
          <p> Room{this.props.roomName}</p>
          <p>Selectable: {this.props.left}</p>
          <p>Player{this.props.player} turn</p>
        </div>
        <button type="button" disabled={this.props.passTurnEn} onClick={() => this.props.passTurn()}> Pass turn </button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  passTurnEnemy: actionCreators.passTurnEnemy,
  passTurn: actionCreators.passTurn
};

const mapStateToProps = state => ({
  player: state.playerTurn,
  connection: state.connectionHub,
  left: state.maxTurned - state.selected.length,
  passTurnEn: state.passTurnEn,
  roomName: state.roomName
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
