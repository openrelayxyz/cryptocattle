import React, { Component } from "react";

import pasture from "../assets/pasture.svg";
import { Hero, Layout, TileSet } from "../components";
import { limit, getLocalCows, getLocalStraws } from "../helpers";

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
        <TileSet
          title="My Cows"
          link="#"
          description="Your collection of cows."
          tiles={limit(10, cows.map(({ image }) => ({ image })))}
        />
        <TileSet
          title="My Straws"
          link="#"
          description="Your collection of straws."
          tiles={limit(10, straws.map(({ image }) => ({ image })))}
        />
      </Layout>
    );
  }
}
