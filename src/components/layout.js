import React from "react";
import { StaticQuery, graphql } from "gatsby";
import "semantic-ui-css/semantic.min.css";

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
      render={data => <>{children}</>}
    />
  );
}
