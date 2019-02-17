import React from "react";
import { Image, Menu, Segment } from "semantic-ui-react";

import dollarStraw from "../../assets/straw_dollar.svg";
import frozenStraw from "../../assets/frozen_straw.svg";
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
            content: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  {isOwned ? (forSale ? "Cancel Sale" : "Sell") : "For Sale"}
                </div>
                <Image
                  src={dollarStraw}
                  style={{
                    width: "48px",
                    height: "48px",
                    marginRight: "0.5rem"
                  }}
                />
              </div>
            ),
            className: "fancy",
            onClick: () =>
              open(SubscreenType.SellSubscreen, { type: "straw", straw })
          }
        ].concat(
          isOwned
            ? [
                {
                  key: 1,
                  content: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>{frozen ? "Unfreeze" : "Freeze"}</div>
                      <Image
                        src={frozenStraw}
                        style={{
                          width: "48px",
                          height: "48px",
                          marginRight: "0.5rem"
                        }}
                      />
                    </div>
                  ),
                  className: "fancy",
                  onClick: () => open(SubscreenType.FreezeSubscreen, { straw })
                },
                {
                  key: 2,
                  icon: "user",
                  content: "Moof",
                  className: "fancy",
                  onClick: () => open(SubscreenType.MoofSubscreen)
                }
              ]
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
