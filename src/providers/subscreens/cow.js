import React from "react";
import { Header, Image, Menu, Segment } from "semantic-ui-react";

import dollarCow from "../../assets/cow_dollar.svg";
import cowpare from "../../assets/cow_pare.svg";
import brand from "../../assets/brand.svg";
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
        <Image
          src={image}
          centered
          style={{
            width: "128px",
            height: "128px"
          }}
        />
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
                  src={dollarCow}
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
              open(SubscreenType.SellSubscreen, { type: "cow", cow })
          },
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
                <div>Cowpare</div>
                <Image
                  src={cowpare}
                  style={{
                    width: "48px",
                    height: "48px",
                    marginRight: "0.5rem"
                  }}
                />
              </div>
            ),
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
                content: (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>Brand</div>
                    <Image
                      src={brand}
                      style={{
                        width: "48px",
                        height: "48px",
                        marginRight: "0.5rem"
                      }}
                    />
                  </div>
                ),
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
