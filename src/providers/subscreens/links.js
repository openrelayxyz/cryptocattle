import React from "react";
import { Link } from "gatsby";
import { Image, Menu } from "semantic-ui-react";

import home from "../../assets/home_icon.svg";
import faq from "../../assets/faq.svg";
import pasture from "../../assets/pasture.svg";
import barn from "../../assets/barn.svg";
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
              content: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>Home</div>
                  <Image
                    src={home}
                    style={{
                      width: "48px",
                      height: "48px",
                      marginRight: "0.5rem"
                    }}
                  />
                </div>
              ),
              onClick: close
            },
            {
              key: 1,
              as: Link,
              to: "/faq",
              content: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>FAQ</div>
                  <Image
                    src={faq}
                    style={{
                      width: "48px",
                      height: "48px",
                      marginRight: "0.5rem"
                    }}
                  />
                </div>
              ),
              onClick: close
            },
            {
              key: 2,
              as: Link,
              to: "/pasture",
              content: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>My Pasture</div>
                  <Image
                    src={pasture}
                    style={{
                      width: "48px",
                      height: "48px",
                      marginRight: "0.5rem"
                    }}
                  />
                </div>
              ),
              onClick: close
            },
            {
              key: 3,
              as: Link,
              to: "/salebarn",
              content: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>Sale Barn</div>
                  <Image
                    src={barn}
                    style={{
                      width: "48px",
                      height: "48px",
                      marginRight: "0.5rem"
                    }}
                  />
                </div>
              ),
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
