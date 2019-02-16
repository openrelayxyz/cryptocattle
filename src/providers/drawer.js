import React, { Component } from "react";

import { LinksSubscreen } from "./subscreens";

export const SubscreenType = {
  LinksSubscreen: 0
};

export const subscreenTypeToComponent = {
  [SubscreenType.LinksSubscreen]: LinksSubscreen
};

export const DrawerContext = React.createContext();

export default class DrawerProvider extends Component {
  state = {
    isOpen: false,
    subscreen: SubscreenType.LinksSubscreen,
    open: subscreen => {
      if (subscreen) {
        this.state.setSubscreen(subscreen);
      }

      this.setState({ isOpen: true });
    },
    close: () => this.setState({ isOpen: false }),
    setSubscreen: subscreen => this.setState({ subscreen })
  };

  render() {
    return (
      <DrawerContext.Provider value={this.state}>
        {this.props.children}
      </DrawerContext.Provider>
    );
  }
}
