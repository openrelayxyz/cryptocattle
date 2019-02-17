import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import { Hero, Layout, Panel } from "../components";
import { TouService, UpstreamService } from "../services";

export default class IndexPage extends Component {
  async componentDidMount() {
    try {
      const touAccepted = await TouService.check();

      if (!touAccepted) {
        await TouService.prompt();
      }

      const cows = await UpstreamService.getMyCows();
      const straws = await UpstreamService.getMyStraws();

      console.log("\n\n\n", "cows", cows, "\n\n\n");
      console.log("\n\n\n", "straws", straws, "\n\n\n");
    } catch (err) {
      console.log("hmm");
    }
  }

  render() {
    const { navigate } = this.props;

    return (
      <Layout>
        <Hero
          image="https://placehold.it/64x64"
          title="This is a tagline."
          description="Lorem ipsum dolor sit amet consectur adipus etc."
        />
        <Panel attached="top">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Panel>
        <Button.Group vertical fluid size="huge" style={{ marginTop: "1rem" }}>
          <Button
            primary
            onClick={() => navigate("/pasture")}
            style={{ marginBottom: "1rem" }}
          >
            Get Started
          </Button>
          <Button onClick={() => navigate("/faq")}>Got Questions?</Button>
        </Button.Group>
      </Layout>
    );
  }
}
