import React from "react";
import { Image } from "semantic-ui-react";

import { Theme } from "../constants";

export default function Tile({ image }) {
  return (
    <div
      style={{
        display: "inline-block",
        marginRight: "0.5rem",
        marginBottom: "0.3rem",
        border: "1px solid #999",
        borderRadius: "3px",
        cursor: "pointer"
      }}
    >
      <Image src={image} />
    </div>
  );
}
