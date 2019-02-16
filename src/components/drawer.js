import React, { Component } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import onClickOutside from "react-onclickoutside";

import { Theme } from "../constants";
import { DrawerContext, subscreenTypeToComponent } from "../providers";

class AbstractDrawer extends Component {
  handleClickOutside = () => this.props.close();

  render() {
    const { close, visible, subscreen } = this.props;
    const ActiveSubscreen = subscreenTypeToComponent[subscreen];

    return (
      <Sidebar
        as={Segment}
        animation="overlay"
        width="wide"
        direction="right"
        vertical
        visible={visible}
        style={{
          padding: 0,
          background: "#fff",
          borderLeft: `2px solid ${Theme.primary}`
        }}
      >
        <Menu
          size="huge"
          items={[
            {
              key: 0,
              icon: "close",
              position: "right",
              content: "Close",
              onClick: close
            }
          ]}
          style={{
            margin: 0,
            borderRadius: 0,
            borderLeft: "none",
            borderRight: "none"
          }}
        />
        <ActiveSubscreen />
      </Sidebar>
    );
  }
}

const WrappedAbstractDrawer = onClickOutside(AbstractDrawer);

export default function Drawer({ visible }) {
  return (
    <DrawerContext.Consumer>
      {({ close, subscreen }) => (
        <WrappedAbstractDrawer
          close={close}
          visible={visible}
          subscreen={subscreen}
        />
      )}
    </DrawerContext.Consumer>
  );
}
