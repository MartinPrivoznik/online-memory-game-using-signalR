import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import "./AsideDeck.css";

class AsideDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const cards = this.props.selected.map(value => (
      <Card index={this.props.board.findIndex(card => parseInt(card.value) === parseInt(value))} key={this.props.board.findIndex(card => parseInt(card.value) === parseInt(value)) + 1} />
    ));

    return (
      <div className="asideDeck">
        <div className="stats">
          <p>{this.props.selectedCount}</p>
        </div>
        {cards}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board,
  selectedCount: state.selected.length,
  selected: state.selected
});

export default connect(mapStateToProps)(AsideDeck);
