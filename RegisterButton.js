import React, { Component } from "react";

class RegisterButton extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.registerMenuToggle}>Register</button>
      </div>
    );
  }
}
export default RegisterButton;
