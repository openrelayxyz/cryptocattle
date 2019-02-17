import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

import { Hero, Layout, TileSet } from "../components";
import { getLocalCows, getLocalStraws } from "../helpers";
import { DrawerContext, SubscreenType } from "../providers";
import { UpstreamService } from "../services";

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
    cows: [],
    straws: [],
    listedCows: [],
    listedStraws: []
  };

  async componentDidMount() {
    const cows = await (process.env.NODE_ENV === "production"
      ? UpstreamService.getCowsForSale()
      : getUpstreamCows());
    const straws = await (process.env.NODE_ENV === "production"
      ? UpstreamService.getStrawsForSale()
      : getUpstreamStraws());

    this.setState({
      cows,
      straws
    });
  }

  render() {
    const { cows, straws, listedCows, listedStraws } = this.state;

    return (
      <Layout>
        <Hero image="https://placehold.it/64x64" title="Sale Barn" />
        <DrawerContext.Consumer>
          {({ open }) => (
            <>
              <TileSet
                title="Cows for Sale"
                tiles={cows.map(cow => ({
                  ...cow,
                  onClick: () =>
                    open(SubscreenType.CowSubscreen, { cow, isOwned: false })
                }))}
              />
              <TileSet
                title="Straws for Sale"
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
                tiles={listedCows.map(cow => ({
                  ...cow,
                  onClick: () =>
                    open(SubscreenType.CowSubscreen, { cow, isOwned: true })
                }))}
              />
              <TileSet
                title="My Listed Straws"
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
