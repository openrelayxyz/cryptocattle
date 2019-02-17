import React, { Component } from "react";

export const CowpareContext = React.createContext();

export default class CowpareProvider extends Component {
  state = {
    independent: null,
    dependent: null,
    setIndependent: independent => this.setState({ independent }),
    setDependent: dependent => this.setState({ dependent })
  };

  render() {
    return (
      <CowpareContext.Provider value={this.state}>
        {this.props.children}
      </CowpareContext.Provider>
    );
  }
}
