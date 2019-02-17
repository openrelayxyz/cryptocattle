import React, { Component } from "react";

import pasture from "../assets/pasture.svg";
import basicCow from "../assets/cow_basic.svg";
import basicStraw from "../assets/straw_basic.svg";
import { Hero, Layout, TileSet } from "../components";
import { getLocalCows, getLocalStraws } from "../helpers";
import { DrawerContext, SubscreenType } from "../providers";
import { UpstreamService } from "../services";

export default class PasturePage extends Component {
  state = {
    cows: [],
    straws: []
  };

  async componentDidMount() {
    const cows = await (process.env.NODE_ENV === "production"
      ? UpstreamService.getMyCows()
      : getLocalCows());
    const straws = await (process.env.NODE_ENV === "production"
      ? UpstreamService.getMyStraws()
      : getLocalStraws());

    this.setState({
      cows,
      straws
    });
  }

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
                image={basicCow}
                title="My Cows"
                tiles={cows.map(cow => ({
                  ...cow,
                  onClick: () =>
                    open(SubscreenType.CowSubscreen, { cow, isOwned: true })
                }))}
              />
              <TileSet
                image={basicStraw}
                title="My Straws"
                tiles={straws.map(straw => ({
                  image: basicStraw,
                  onClick: () =>
                    open(SubscreenType.StrawSubscreen, {
                      straw,
                      isOwned: true
                    })
                }))}
                unsortable
              />
            </>
          )}
        </DrawerContext.Consumer>
      </Layout>
    );
  }
}
