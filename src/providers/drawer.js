import React, { Component } from "react";

import { CowSubscreen, LinksSubscreen } from "./subscreens";

export const SubscreenType = {
  LinksSubscreen: 0,
  CowSubscreen: 1
};

export const subscreenTypeToComponent = {
  [SubscreenType.LinksSubscreen]: LinksSubscreen,
  [SubscreenType.CowSubscreen]: CowSubscreen
};

export const DrawerContext = React.createContext();

export default class DrawerProvider extends Component {
  state = {
    isOpen: false,
    subscreen: SubscreenType.LinksSubscreen,
    subscreenProps: {},
    open: (subscreen, subscreenProps) => {
      if (subscreen) {
        this.state.setSubscreen(subscreen);
      }

      if (subscreenProps) {
        this.state.setSubscreenProps(subscreenProps);
      }

      this.setState({ isOpen: true });
    },
    close: () =>
      this.setState({
        isOpen: false,
        subscreen: SubscreenType.LinksSubscreen,
        subscreenProps: {}
      }),
    setSubscreen: subscreen => this.setState({ subscreen }),
    setSubscreenProps: subscreenProps => this.setState({ subscreenProps })
  };

  render() {
    return (
      <DrawerContext.Provider value={this.state}>
        {this.props.children}
      </DrawerContext.Provider>
    );
  }
}
