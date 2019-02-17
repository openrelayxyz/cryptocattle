import React, { Component } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import onClickOutside from "react-onclickoutside";

import { Theme } from "../constants";
import { DrawerContext, subscreenTypeToComponent } from "../providers";

class AbstractDrawer extends Component {
  handleClickOutside = () => this.props.close();

  render() {
    const { close, visible, subscreen, title } = this.props;
    const ActiveSubscreen = subscreenTypeToComponent[subscreen];

    return (
      <Sidebar
        id="drawer"
        as={Segment}
        animation="overlay"
        width="wide"
        direction="right"
        vertical
        visible={visible}
        style={{
          minHeight: "100vh",
          maxHeight: "100vh",
          padding: 0,
          background: "#fff",
          borderLeft: `2px solid ${Theme.primary}`,
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        <Menu
          size="huge"
          widths={2}
          items={[
            {
              key: 0,
              icon: "hand point right outline",
              content: title
            },
            {
              key: 1,
              icon: "close",
              position: "right",
              content: "Close",
              onClick: close,
              className: "fancy"
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
      {({ close, subscreen, subscreenTitle }) => (
        <WrappedAbstractDrawer
          close={close}
          visible={visible}
          subscreen={subscreen}
          title={subscreenTitle}
        />
      )}
    </DrawerContext.Consumer>
  );
}
