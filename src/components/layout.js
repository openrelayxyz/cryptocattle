import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Segment, Sidebar } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { DrawerContext, DrawerProvider } from "../providers";
import Drawer from "./drawer";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <DrawerProvider>
          <Sidebar.Pushable>
            <Navbar />
            <DrawerContext.Consumer>
              {({ isOpen }) => <Drawer visible={isOpen} />}
            </DrawerContext.Consumer>
            <Segment
              style={{
                height: "100vh",
                paddingTop: "49px"
              }}
            >
              <Sidebar.Pusher>{children}</Sidebar.Pusher>
            </Segment>
          </Sidebar.Pushable>
        </DrawerProvider>
      )}
    />
  );
}
