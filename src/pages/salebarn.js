import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

import barn from "../assets/barn.svg";
import dollarCow from "../assets/cow_dollar.svg";
import dollarStraw from "../assets/straw_dollar.svg";
import basicStraw from "../assets/straw_basic.svg";
import listCow from "../assets/cow_list.svg";
import listStraw from "../assets/straw_list.svg";
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
      ? // ? UpstreamService.getStrawsForSale()
        getUpstreamStraws()
      : getUpstreamStraws());

    this.setState({
      cows,
      straws,
      listedCows: getLocalCows().filter(cow => cow.forSale),
      listedStraws: getLocalStraws().filter(straw => straw.forSale)
    });
  }

  render() {
    const { cows, straws, listedCows, listedStraws } = this.state;

    return (
      <Layout>
        <Hero
          image={barn}
          title="Sale Barn"
          description="Buy and sell Cows and Straws on the free mooket."
        />
        <DrawerContext.Consumer>
          {({ open }) => (
            <>
              <TileSet
                image={dollarCow}
                title="Cows for Sale"
                tiles={cows.map(cow => ({
                  ...cow,
                  onClick: () =>
                    open(SubscreenType.CowSubscreen, { cow, isOwned: false })
                }))}
              />
              <TileSet
                image={dollarStraw}
                title="Straws for Sale"
                tiles={straws.map(straw => ({
                  image: basicStraw,
                  onClick: () =>
                    open(SubscreenType.StrawSubscreen, {
                      straw,
                      isOwned: false
                    })
                }))}
              />
              <Divider />
              <TileSet
                image={listCow}
                title="My Listed Cows"
                tiles={listedCows.map(cow => ({
                  ...cow,
                  onClick: () =>
                    open(SubscreenType.CowSubscreen, { cow, isOwned: true })
                }))}
              />
              <TileSet
                image={listStraw}
                title="My Listed Straws"
                tiles={listedStraws.map(straw => ({
                  image: basicStraw,
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
