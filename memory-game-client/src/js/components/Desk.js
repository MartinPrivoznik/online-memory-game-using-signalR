import React, { Component } from "react";
import { connect } from "react-redux";
import "./Desk.css";
import Card from "./Card";
import { actionCreators } from "../store/Reducer";

class Desk extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.connection.on('TurnCard', (number) => {
      this.props.turnEnemy(number);
    });
  }

  render() {

    const cards = [];

    for (let index = 0; index < this.props.cardCount; index++) {
      cards.push(<Card index={index} key={index + 1}/>);
    }

    return <div className="desk">{cards}</div>;
  }
}

const mapStateToProps = state => ({
  cardCount: state.board.length,
  connection: state.connectionHub
});

const mapDispatchToProps = {
  turnEnemy: actionCreators.turnEnemy
};

export default connect(mapStateToProps, mapDispatchToProps)(Desk);

