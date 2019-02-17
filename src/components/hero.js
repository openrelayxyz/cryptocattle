import React from "react";
import { Header, Image, Segment } from "semantic-ui-react";

export default function Hero({ image, title, description }) {
  return (
    <Segment
      basic
      style={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <Image
        src={image}
        size="tiny"
        style={{
          marginRight: "1rem"
        }}
      />
      <Header
        content={<span className="fancy">{title}</span>}
        subheader={description}
        style={{
          margin: 0
        }}
      />
    </Segment>
  );
}
