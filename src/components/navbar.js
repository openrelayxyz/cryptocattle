import React from "react";
import { Link } from "gatsby";
import { Image, Menu } from "semantic-ui-react";

import logo from "../assets/logo.svg";
import { DrawerContext, SubscreenType } from "../providers";

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
              content: (
                <Image
                  src={logo}
                  style={{
                    width: "50px",
                    height: "50px"
                  }}
                />
              ),
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
              onClick: () => open(SubscreenType.LinksSubscreen),
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
