import React, { Component } from "react";

export const MessengerContext = React.createContext();

/**
 * Message
 *  - content
 *  - duration
 *  - severity
 */

export default class MessengerProvider extends Component {
  state = {
    message: null,
    showMessage: message => {
      const defaults = { content: "", duration: 3000, severity: "positive" };
      const actualMessage = {
        ...defaults,
        ...message
      };
      const { content, severity, duration } = actualMessage;

      this.setState({
        message: {
          content,
          severity
        }
      });
      setTimeout(this.state.clearMessage, duration);
    },
    clearMessage: () => this.setState({ message: null })
  };

  render() {
    return (
      <MessengerContext.Provider value={this.state}>
        {this.props.children}
      </MessengerContext.Provider>
    );
  }
}
