import React from "react";
import { Header, Image, Menu, Segment } from "semantic-ui-react";

import { AspectTable, AttributeTable, TraitTable } from "../../components";
import { BrandService } from "../../services";
import { CowpareContext } from "../cowpare";
import { DrawerContext, SubscreenType } from "../drawer";

function AbstractCowSubscreen({ open, setIndependent, cow, isOwned }) {
  const { id, image, forSale } = cow;

  return (
    <>
      <Segment
        attached="top"
        style={{
          margin: 0
        }}
      >
        <Header content={BrandService.getName(id)} />
      </Segment>
      <Segment attached>
        <Image src={image} />
      </Segment>
      <Segment attached>
        <TraitTable cows={[cow]} />
        <AspectTable cows={[cow]} />
        <AttributeTable cows={[cow]} />
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
              open(SubscreenType.SellSubscreen, { type: "cow", cow })
          },
          {
            key: 1,
            icon: "users",
            content: "Cowpare",
            className: "fancy",
            onClick: () => {
              setIndependent(cow);
              open(SubscreenType.CowpareSubscreen);
            }
          }
        ].concat(
          isOwned
            ? {
                key: 2,
                icon: "user",
                content: "Brand",
                className: "fancy",
                onClick: () => open(SubscreenType.BrandSubscreen, { id })
              }
            : null
        )}
      />
    </>
  );
}

export default function CowSubscreen() {
  return (
    <DrawerContext.Consumer>
      {({ open, subscreenProps: { cow, isOwned } }) => (
        <CowpareContext.Consumer>
          {({ setIndependent }) => (
            <AbstractCowSubscreen
              open={open}
              cow={cow}
              isOwned={isOwned}
              setIndependent={setIndependent}
            />
          )}
        </CowpareContext.Consumer>
      )}
    </DrawerContext.Consumer>
  );
}
