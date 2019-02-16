import React from "react";
import { Button } from "semantic-ui-react";

import { Hero, Layout, Panel } from "../components";

export default function IndexPage() {
  return (
    <Layout>
      <Hero
        image="https://placehold.it/64x64"
        title="This is a tagline."
        description="Lorem ipsum dolor sit amet consectur adipus etc."
      />
      <Panel attached="top">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Panel>
      <Button primary attached="bottom">
        Get Started
      </Button>
    </Layout>
  );
}
