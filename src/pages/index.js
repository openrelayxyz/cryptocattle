import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import home from "../assets/home_icon.svg";
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
          image={home}
          title="CryptoCattle"
          description="Like CryptoKitties but Beefier.  Ethereum fun beyond cow-pare."
        />
        <Panel attached="top" />
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
