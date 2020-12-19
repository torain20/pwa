import React, { Component } from "react";

import Navbar from "./components/Navbar/Navbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      displayRegisterMenu: false,
    };
    this.registerMenuClickHandler = this.registerMenuClickHandler.bind(this);
  }
  registerMenuClickHandler = () => {
    this.setState((prevState) => {
      return { displayRegisterMenu: !prevState.displayRegisterMenu };
    });
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div style={{ height: "100%" }}>
        <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer
          show={this.state.sideDrawerOpen}
          registerMenuClickHandler={this.registerMenuClickHandler}
        />

        {backdrop}
        <main style={{ marginTop: "64px" }}>
          <p>This is the page content!</p>
        </main>
      </div>
    );
  }
}

export default App;
