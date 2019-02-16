import React from "react";
import { StaticQuery, graphql } from "gatsby";
import "semantic-ui-css/semantic.min.css";

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
        <>
          <Navbar />
          {children}
        </>
      )}
    />
  );
}
