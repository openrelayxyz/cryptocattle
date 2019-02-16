import React, { Component } from "react";

import pasture from "../assets/pasture.svg";
import { Hero, Layout, TileSet } from "../components";
import { limit, getLocalCows, getLocalStraws } from "../helpers";
import { DrawerContext, SubscreenType } from "../providers";

export default class PasturePage extends Component {
  state = {
    cows: getLocalCows(),
    straws: getLocalStraws()
  };

  render() {
    const { cows, straws } = this.state;

    return (
      <Layout>
        <Hero
          image={pasture}
          title="My Pasture"
          description="View and manage your Cows and Straws."
        />
        <DrawerContext.Consumer>
          {({ open }) => (
            <>
              <TileSet
                title="My Cows"
                link="#"
                description="Your collection of cows."
                tiles={limit(
                  10,
                  cows.map(cow => ({
                    image: cow.image,
                    onClick: () =>
                      open(SubscreenType.CowSubscreen, { cow, isOwned: true })
                  }))
                )}
              />
              <TileSet
                title="My Straws"
                link="#"
                description="Your collection of straws."
                tiles={limit(
                  10,
                  straws.map(straw => ({
                    image: straw.image,
                    onClick: () =>
                      open(SubscreenType.StrawSubscreen, {
                        straw,
                        isOwned: true
                      })
                  }))
                )}
              />
            </>
          )}
        </DrawerContext.Consumer>
      </Layout>
    );
  }
}
