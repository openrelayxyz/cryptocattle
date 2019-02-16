import React, { Component } from "react";

export const DrawerContext = React.createContext();

export default class DrawerProvider extends Component {
  state = {
    isOpen: false,
    open: () => this.setState({ isOpen: true }),
    close: () => this.setState({ isOpen: false })
  };

  render() {
    return (
      <DrawerContext.Provider value={this.state}>
        {this.props.children}
      </DrawerContext.Provider>
    );
  }
}
