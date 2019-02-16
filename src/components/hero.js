import React from "react";
import { Header, Image, Segment } from "semantic-ui-react";

export default function Hero({ image, title, description }) {
  return <Header image={image} content={title} subheader={description} />;
}
