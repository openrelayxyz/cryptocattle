import React from "react";
import { Link } from "gatsby";
import { Menu } from "semantic-ui-react";

import { DrawerContext } from "../drawer";

export default function LinksSubscreen() {
  return (
    <DrawerContext.Consumer>
      {({ close }) => (
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
              content: "Home",
              onClick: close
            },
            {
              key: 1,
              as: Link,
              to: "/faq",
              icon: "question",
              content: "FAQ",
              onClick: close
            },
            {
              key: 2,
              as: Link,
              to: "/pasture",
              icon: "home",
              content: "My Pasture",
              onClick: close
            },
            {
              key: 3,
              as: Link,
              to: "/salebarn",
              icon: "home",
              content: "Sale Barn",
              onClick: close
            }
          ]}
          style={{
            margin: 0,
            borderTop: "none"
          }}
        />
      )}
    </DrawerContext.Consumer>
  );
}
