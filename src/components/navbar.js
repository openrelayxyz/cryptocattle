import React from "react";
import { Link } from "gatsby";
import { Menu } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

import { DrawerContext } from "../providers";

export default function Navbar() {
  return (
    <DrawerContext.Consumer>
      {({ open }) => (
        <Menu
          fixed="top"
          size="huge"
          widths={3}
          items={[
            {
              key: 0,
              as: Link,
              to: "/",
              icon: "question circle",
              style: {
                flex: 1
              }
            },
            {
              key: 1,
              as: Link,
              to: "/",
              content: "CryptoCattle",
              style: {
                flex: 3
              }
            },
            {
              key: 2,
              icon: "bars",
              onClick: open,
              style: {
                flex: 1
              }
            }
          ]}
        />
      )}
    </DrawerContext.Consumer>
  );
}
