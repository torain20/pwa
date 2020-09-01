import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage } from "../utils/storage";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
    };
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.setState({
      isLoading: true,
    });

    const obj = getFromStorage("pwa");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("api/account/logout?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            localStorage.removeItem("pwa");
            this.setState({
              token: "",
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.onLogout}>Log Out</button>
      </div>
    );
  }
}

export default Logout;
