import React from "react";
import { Segment } from "semantic-ui-react";

import { Theme } from "../constants";

export default function Panel(props) {
  return (
    <Segment
      {...props}
      style={{
        borderLeft: `2px solid ${Theme.primaryLighter}`,
        ...(props.style || {})
      }}
    />
  );
}
