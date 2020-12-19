import React, { Component } from "react";
import "./SideDrawer.css";
import Register from "../Register";
import RegisterButton from "../RegisterButton";
import LogInButton from "../LoginButton.js";
import Login from "../Login";
import { getFromStorage } from "../../utils/storage";
import Logout from "../Logout";

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerMenuActive: false,
      logInMenuActive: false,
      isLoading: true,
      token: "",
    };
    this.registerMenuToggle = this.registerMenuToggle.bind(this);
    this.logInMenuToggle = this.logInMenuToggle.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("pwa");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/verify?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token,
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

  registerMenuToggle = () => {
    this.setState((prevState) => {
      return { registerMenuActive: !prevState.registerMenuActive };
    });
  };

  logInMenuToggle = () => {
    this.setState((prevState) => {
      return { logInMenuActive: !prevState.logInMenuActive };
    });
  };

  render() {
    const { isLoading, token } = this.state;

    let drawerClasses = "side-drawer";

    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    if (!token) {
      return (
        <nav className={drawerClasses}>
          <ul>
            <li>
              <a href="/">New Posts</a>
            </li>
            <li>
              <div>
                <RegisterButton registerMenuToggle={this.registerMenuToggle} />
                {this.state.registerMenuActive && <Register />}
              </div>
            </li>
            <li>
              <div>
                <LogInButton logInMenuToggle={this.logInMenuToggle} />
                {this.state.logInMenuActive && <Login />}
              </div>
            </li>
          </ul>
        </nav>
      );
    }
    return (
      <nav className={drawerClasses}>
        <ul>
          <li>
            <a href="/">New Posts</a>
          </li>
          <li>
            <a href="/">Create Post</a>
          </li>
          <li>
            <div>{<Logout />}</div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideDrawer;
