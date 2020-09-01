import React, { Component } from "react";
import "whatwg-fetch";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isLoading: true,
      registerError: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      //confirmPassword: ""
    };

    this.onTextboxChangeRegisterEmail = this.onTextboxChangeRegisterEmail.bind(
      this
    );
    this.onTextboxChangeRegisterPassword = this.onTextboxChangeRegisterPassword.bind(
      this
    );
    this.onTextboxChangeRegisterUsername = this.onTextboxChangeRegisterUsername.bind(
      this
    );

    this.onRegister = this.onRegister.bind(this);
  }

  handleClick() {
    this.setState({});
  }

  onTextboxChangeRegisterUsername(event) {
    this.setState({
      registerUsername: event.target.value,
    });
  }

  onTextboxChangeRegisterEmail(event) {
    this.setState({
      registerEmail: event.target.value,
    });
  }

  onTextboxChangeRegisterPassword(event) {
    this.setState({
      registerPassword: event.target.value,
    });
  }
  /*
  registerPasswordConfirmation(value) {
    this.setState({
      confirmPassword: value
    });
  }
*/

  onRegister() {
    // Grab state
    const { registerUsername, registerEmail, registerPassword } = this.state;

    this.setState({
      isLoading: true,
    });

    // ...use email, username and password in ajax request or similar...
    fetch("/api/account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            registerError: json.message,
            registerEmail: "",
            registerPassword: "",
            registerUsername: "",
          });
        } else {
          this.setState({
            registerError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      registerUsername,
      registerEmail,
      registerPassword,
      registerError,
    } = this.state;

    return (
      <div>
        {registerError ? <p>{registerError}</p> : null}
        {/*<p>Register</p>*/}
        <input
          type="text"
          placeholder="Username"
          value={registerUsername}
          onChange={this.onTextboxChangeRegisterUsername}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={registerEmail}
          onChange={this.onTextboxChangeRegisterEmail}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={this.onTextboxChangeRegisterPassword}
        />
        <br />
        <button onClick={this.onRegister}>Submit</button>
      </div>
    );
  }
}

export default Register;
