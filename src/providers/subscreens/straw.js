import React from "react";
import { Image, Menu, Segment } from "semantic-ui-react";

import { DrawerContext } from "../drawer";

function AbstractStrawSubscreen({
  straw: {
    id,
    image,
    attributes: { frozen, parentId },
    forSale
  },
  isOwned
}) {
  return (
    <>
      <Segment
        attached="top"
        style={{
          margin: 0
        }}
      >
        <Image src={image} />
      </Segment>
      <Menu
        size="massive"
        attached
        vertical
        fluid
        items={[
          {
            key: 0,
            icon: "usd",
            content: isOwned ? (forSale ? "Cancel Sale" : "Sell") : "For Sale"
          }
        ].concat(
          isOwned
            ? {
                key: 1,
                icon: "snowflake",
                content: frozen ? "Unfreeze" : "Freeze"
              }
            : null
        )}
      />
    </>
  );
}

export default function StrawSubscreen() {
  return (
    <DrawerContext.Consumer>
      {({ subscreenProps: { straw, isOwned } }) => (
        <AbstractStrawSubscreen straw={straw} isOwned={isOwned} />
      )}
    </DrawerContext.Consumer>
  );
}
