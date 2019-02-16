import React from "react";
import { Link } from "gatsby";
import { Menu } from "semantic-ui-react";

export default function LinksSubscreen() {
  return (
    <Menu
      size="massive"
      fluid
      vertical
      items={[
        {
          key: 0,
          as: Link,
          to: "/",
          icon: "home",
          content: "Home"
        },
        {
          key: 1,
          as: Link,
          to: "/faq",
          icon: "question",
          content: "FAQ"
        },
        {
          key: 2,
          as: Link,
          to: "/pasture",
          icon: "home",
          content: "My Pasture"
        },
        {
          key: 3,
          as: Link,
          to: "/salebarn",
          icon: "home",
          content: "Sale Barn"
        }
      ]}
      style={{
        margin: 0,
        borderTop: "none"
      }}
    />
  );
}
