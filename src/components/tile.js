import React from "react";
import { Image } from "semantic-ui-react";

export default function Tile({ image, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-block",
        marginRight: "0.5rem",
        marginBottom: "0.3rem",
        border: "1px solid #999",
        borderRadius: "3px",
        cursor: "pointer"
      }}
    >
      <Image
        src={image}
        style={{
          width: "48px",
          height: "48px"
        }}
      />
    </div>
  );
}
