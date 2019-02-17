import React from "react";
import { Image, Menu, Segment } from "semantic-ui-react";

import { DrawerContext, SubscreenType } from "../drawer";

function AbstractStrawSubscreen({ open, straw, isOwned }) {
  const {
    id,
    image,
    attributes: { frozen, parentId },
    forSale
  } = straw;

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
            content: isOwned ? (forSale ? "Cancel Sale" : "Sell") : "For Sale",
            className: "fancy",
            onClick: () =>
              open(SubscreenType.SellSubscreen, { type: "straw", straw })
          }
        ].concat(
          isOwned
            ? {
                key: 1,
                icon: "snowflake",
                content: frozen ? "Unfreeze" : "Freeze",
                className: "fancy",
                onClick: () => open(SubscreenType.FreezeSubscreen, { straw })
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
      {({ open, subscreenProps: { straw, isOwned } }) => (
        <AbstractStrawSubscreen open={open} straw={straw} isOwned={isOwned} />
      )}
    </DrawerContext.Consumer>
  );
}
