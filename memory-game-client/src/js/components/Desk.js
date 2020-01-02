import React, { Component } from "react";
import { connect } from "react-redux";
import "./Desk.css";

class Desk extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div> Cards </div>;
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Desk);
