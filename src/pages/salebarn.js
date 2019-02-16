import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

import { Hero, Layout, TileSet } from "../components";
import { limit, getLocalCows, getLocalStraws } from "../helpers";

const getUpstreamCows = () => {
  const storedCows = window.localStorage.getItem("upstreamCows") || "[]";

  return JSON.parse(storedCows);
};

const getUpstreamStraws = () => {
  const storedStraws = window.localStorage.getItem("upstreamStraws") || "[]";

  return JSON.parse(storedStraws);
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
        <TileSet
          title="Cows for Sale"
          link="#"
          description="Cows available on the marketplace."
          tiles={limit(10, cows.map(({ image }) => ({ image })))}
        />
        <TileSet
          title="Straws for Sale"
          link="#"
          description="Straws available on the marketplace."
          tiles={limit(10, straws.map(({ image }) => ({ image })))}
        />
        <Divider />
        <TileSet
          title="My Listed Cows"
          link="#"
          description="Cows you are attempting to sell on the marketplace."
          tiles={limit(10, listedCows.map(({ image }) => ({ image })))}
        />
        <TileSet
          title="My Listed Straws"
          link="#"
          description="Straws you are attempting to sell on the marketplace."
          tiles={limit(10, listedStraws.map(({ image }) => ({ image })))}
        />
      </Layout>
    );
  }
}
