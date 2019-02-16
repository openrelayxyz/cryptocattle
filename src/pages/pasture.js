import React, { Component } from "react";

import pasture from "../assets/pasture.svg";
import { Hero, Layout, TileSet } from "../components";
import { limit } from "../helpers";

const getLocalCows = () => {
  const storedCows = window.localStorage.getItem("cows") || "[]";

  return JSON.parse(storedCows);
};

const getLocalStraws = () => {
  const storedStraws = window.localStorage.getItem("straws") || "[]";

  return JSON.parse(storedStraws);
};

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
          tiles={limit(10, cows.map(({ image }) => ({ image })))}
        />
        <TileSet
          title="My Straws"
          link="#"
          tiles={limit(10, straws.map(({ image }) => ({ image })))}
        />
      </Layout>
    );
  }
}
