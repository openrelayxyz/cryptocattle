import React from "react";
import { Header, Segment } from "semantic-ui-react";

import Panel from "./panel";
import Tile from "./tile";

export default function TileSet({ title, link, description, tiles }) {
  return (
    <>
      <Segment basic attached="top">
        <Header
          as="h3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>{title}</div> <small>view all</small>
        </Header>
        {description}
      </Segment>
      <Panel attached="bottom">
        {tiles.map((tile, index) => (
          <Tile key={index} {...tile} />
        ))}
      </Panel>
    </>
  );
}
