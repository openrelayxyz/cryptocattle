import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

import { Hero, Layout, TileSet } from "../components";
import { getLocalCows, getLocalStraws } from "../helpers";
import { DrawerContext, SubscreenType } from "../providers";

const getUpstreamCows = () => {
  if (typeof window !== "undefined") {
    const storedCows = window.localStorage.getItem("upstreamCows") || "[]";

    return JSON.parse(storedCows);
  }

  return [];
};

const getUpstreamStraws = () => {
  if (typeof window !== "undefined") {
    const storedStraws = window.localStorage.getItem("upstreamStraws") || "[]";

    return JSON.parse(storedStraws);
  }

  return [];
};

export default class SaleBarnPage extends Component {
  state = {
    cows: getUpstreamCows(),
    straws: getUpstreamStraws(),
    listedCows: getLocalCows().filter(({ forSale }) => forSale),
    listedStraws: getLocalStraws().filter(({ forSale }) => forSale)
  };

  render() {
    const { cows, straws, listedCows, listedStraws } = this.state;

    return (
      <Layout>
        <Hero
          image="https://placehold.it/64x64"
          title="Sale Barn"
          description="Buy new Cows and Straws and view the ones you have for sale."
        />
        <DrawerContext.Consumer>
          {({ open }) => (
            <>
              <TileSet
                title="Cows for Sale"
                link="#"
                description="Cows available on the marketplace."
                tiles={cows.map(cow => ({
                  ...cow,
                  onClick: () =>
                    open(SubscreenType.CowSubscreen, { cow, isOwned: false })
                }))}
              />
              <TileSet
                title="Straws for Sale"
                link="#"
                description="Straws available on the marketplace."
                tiles={straws.map(straw => ({
                  image: straw.image,
                  onClick: () =>
                    open(SubscreenType.StrawSubscreen, {
                      straw,
                      isOwned: false
                    })
                }))}
              />
              <Divider />
              <TileSet
                title="My Listed Cows"
                link="#"
                description="Cows you are attempting to sell on the marketplace."
                tiles={listedCows.map(cow => ({
                  ...cow,
                  onClick: () =>
                    open(SubscreenType.CowSubscreen, { cow, isOwned: true })
                }))}
              />
              <TileSet
                title="My Listed Straws"
                link="#"
                description="Straws you are attempting to sell on the marketplace."
                tiles={listedStraws.map(straw => ({
                  image: straw.image,
                  onClick: () =>
                    open(SubscreenType.StrawSubscreen, {
                      straw,
                      isOwned: true
                    })
                }))}
              />
            </>
          )}
        </DrawerContext.Consumer>
      </Layout>
    );
  }
}
