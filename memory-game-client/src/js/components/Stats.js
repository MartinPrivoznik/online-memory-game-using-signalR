import "./Stats.css";
import React, { Component } from "react";
import { connect } from "react-redux";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={this.props.turnsLeft === 0 ? "stats endGame" : "stats"}>
        <p>Tahů do konce: {this.props.turnsLeft}</p>
        <p>Ještě lze vybrat: {this.props.left}</p>
        <p>Celkem bodů: {this.props.sum}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  left: state.maxTurned - state.selected.length,
  turnsLeft: state.turnsLeft,
  sum: state.sum
});

export default connect(mapStateToProps)(Stats);
