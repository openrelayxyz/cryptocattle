import React from "react";
import { Button, List, Segment } from "semantic-ui-react";

import { Hero, Layout } from "../components";
import { faq } from "../constants";

export default function FaqPage({ navigate }) {
  return (
    <Layout>
      <Hero
        image="https://placehold.it/64x64"
        title="Frequently Asked Questions"
        description="Lorem ipsum dolor sit amet consectur adipus etc."
      />
      <Segment>
        <List
          divided
          relaxed="very"
          size="huge"
          items={Object.entries(faq).map(([question, answer]) => ({
            header: question,
            content: (
              <div
                dangerouslySetInnerHTML={{
                  __html: answer
                }}
              />
            )
          }))}
        />
      </Segment>
      <Button.Group vertical fluid size="huge" style={{ marginTop: "1rem" }}>
        <Button
          primary
          onClick={() => navigate("/pasture")}
          style={{ marginBottom: "1rem" }}
        >
          Get Started
        </Button>
      </Button.Group>
    </Layout>
  );
}
