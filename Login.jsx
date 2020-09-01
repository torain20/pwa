import React, { Component } from "react";
import "whatwg-fetch";
import { setInStorage } from "../utils/storage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: "",
      loginEmail: "",
      loginPassword: "",
      isLoading: true,
      token: "",
      /*email: "",
      password: ""*/
    };

    this.onLogin = this.onLogin.bind(this);
    this.onTextboxChangeLoginEmail = this.onTextboxChangeLoginEmail.bind(this);
    this.onTextboxChangeLoginPassword = this.onTextboxChangeLoginPassword.bind(
      this
    );
  }

  /*loginEmail(value) {
    this.setState({
      email: value,
    });
  }

  loginPassword(value) {
    this.setState({
      password: value,
    });
  }*/

  handleClick() {
    this.setState({});
  }

  onTextboxChangeLoginEmail(event) {
    this.setState({
      loginEmail: event.target.value,
    });
  }
  onTextboxChangeLoginPassword(event) {
    this.setState({
      loginPassword: event.target.value,
    });
  }

  onLogin() {
    // Grab state
    const { loginEmail, loginPassword } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        if (json.success) {
          setInStorage("pwa", { token: json.token });
          this.setState({
            loginError: json.message,
            isLoading: false,
            loginEmail: "",
            loginPassword: "",
            token: json.token,
          });
        } else {
          this.setState({
            loginError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const { loginEmail, loginPassword, loginError } = this.state;

    return (
      <div>
        {loginError ? <p>{loginError}</p> : null}
        <form>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={this.onTextboxChangeLoginEmail}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={this.onTextboxChangeLoginPassword}
          />
          <button onClick={this.onLogin}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
