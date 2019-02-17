import React, { Component } from "react";

import {
  BrandSubscreen,
  CowSubscreen,
  LinksSubscreen,
  StrawSubscreen
} from "./subscreens";

export const SubscreenType = {
  LinksSubscreen: 0,
  CowSubscreen: 1,
  StrawSubscreen: 2,
  BrandSubscreen: 3
};

export const subscreenTypeToComponent = {
  [SubscreenType.LinksSubscreen]: LinksSubscreen,
  [SubscreenType.CowSubscreen]: CowSubscreen,
  [SubscreenType.StrawSubscreen]: StrawSubscreen,
  [SubscreenType.BrandSubscreen]: BrandSubscreen
};

export const subscreenTypeToTitle = {
  [SubscreenType.LinksSubscreen]: "Links",
  [SubscreenType.CowSubscreen]: "Viewing a Cow",
  [SubscreenType.StrawSubscreen]: "Viewing a Straw",
  [SubscreenType.BrandSubscreen]: "Brand a Cow"
};

export const DrawerContext = React.createContext();

export default class DrawerProvider extends Component {
  state = {
    isOpen: false,
    subscreen: SubscreenType.LinksSubscreen,
    subscreenTitle: subscreenTypeToTitle[SubscreenType.LinksSubscreen],
    subscreenProps: {},
    open: (subscreen, subscreenProps) => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";

      if (subscreen) {
        this.state.setSubscreen(subscreen);
      }

      if (subscreenProps) {
        this.state.setSubscreenProps(subscreenProps);
      }

      this.setState({ isOpen: true });
    },
    close: () => {
      document.body.style.overflow = "initial";

      this.setState({
        isOpen: false,
        subscreen: SubscreenType.LinksSubscreen,
        subscreenProps: {}
      });
    },
    setSubscreen: subscreen =>
      this.setState({
        subscreen,
        subscreenTitle: subscreenTypeToTitle[subscreen]
      }),
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
