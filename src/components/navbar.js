import React from "react";
import { Menu } from "semantic-ui-react";

export default function Navbar() {
  return (
    <Menu
      fixed="top"
      size="huge"
      widths={3}
      items={[
        {
          icon: "question circle",
          style: {
            flex: 1
          }
        },
        {
          content: "CryptoCattle",
          style: {
            flex: 3
          }
        },
        {
          icon: "bars",
          style: {
            flex: 1
          }
        }
      ]}
    />
  );
}
