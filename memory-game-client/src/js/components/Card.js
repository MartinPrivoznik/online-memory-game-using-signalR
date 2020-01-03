import { connect } from "react-redux";
import { actionCreators } from "../store/Reducer";
import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {init: null};
  }
  render() {
    
    return (
      <figure
        className={this.props.turned ? "item selected" : "item"}
        onClick={() => this.props.turn(this.props.value)}
      >
        <div className="face">
          <p>{this.props.value}</p>
        </div>
        <div className="back">
          <div className="yin-yang" />
        </div>
      </figure>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state.board[ownProps.index]
});

const mapDispatchToProps = {
  turn: actionCreators.turn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
