import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Segment, Sidebar } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import {
  CowpareProvider,
  DrawerContext,
  DrawerProvider,
  MessengerContext,
  MessengerProvider
} from "../providers";
import Drawer from "./drawer";
import Messenger from "./messenger";
import Navbar from "./navbar";
import "./layout.css";

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
          <MessengerProvider>
            <CowpareProvider>
              <MessengerContext.Consumer>
                {({ message }) => message && <Messenger />}
              </MessengerContext.Consumer>
              <Sidebar.Pushable>
                <Navbar />
                <DrawerContext.Consumer>
                  {({ isOpen }) => <Drawer visible={isOpen} />}
                </DrawerContext.Consumer>
                <Segment
                  style={{
                    minHeight: "100vh",
                    paddingTop: "80px"
                  }}
                >
                  <Sidebar.Pusher>{children}</Sidebar.Pusher>
                </Segment>
              </Sidebar.Pushable>
            </CowpareProvider>
          </MessengerProvider>
        </DrawerProvider>
      )}
    />
  );
}
