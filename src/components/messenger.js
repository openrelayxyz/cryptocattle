import React from "react";
import { Message } from "semantic-ui-react";

import { MessengerContext } from "../providers";

function AbstractMessenger({ style, message: { content, severity }, clear }) {
  return (
    <Message
      size="huge"
      content={content}
      positive={severity === "positive"}
      negative={severity === "negative"}
      onDismiss={clear}
      style={{
        position: "fixed",
        bottom: 0,
        zIndex: 999,
        margin: 0,
        width: "100vw",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        ...style
      }}
    />
  );
}

export default function Messenger() {
  return (
    <MessengerContext.Consumer>
      {({ message, clearMessage }) =>
        message && <AbstractMessenger message={message} clear={clearMessage} />
      }
    </MessengerContext.Consumer>
  );
}
