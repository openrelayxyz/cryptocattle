import React, { Component } from "react";
import { Button, Dropdown, Header, Menu, Segment } from "semantic-ui-react";

import { personalityTypes, attributeTypes } from "../constants";
import { limit } from "../helpers";
import Panel from "./panel";
import Tile from "./tile";

const orderFunctions = {
  highToLow: (collection, sort) =>
    collection.sort((a, b) => {
      return b.attributes[sort] - a.attributes[sort];
    }),
  lowToHigh: (collection, sort) =>
    collection.sort((a, b) => {
      return a.attributes[sort] - b.attributes[sort];
    })
};

const orderToEnglish = {
  highToLow: "high to low",
  lowToHigh: "low to high"
};

const attributeToEnglish = {
  generation: "Generation",
  moofactoryPeriod: "Moofactory Period",
  strength: "Strength",
  dexterity: "Dexterity",
  constitution: "Constitution",
  intelligence: "Intelligence",
  wisdom: "Wisdom",
  charisma: "Charisma"
};

export default class TileSet extends Component {
  state = {
    viewingAll: false,
    sortBy: "any",
    orderBy: "any",
    personality: "any"
  };

  toggleViewingAll = () =>
    this.setState(prevState => ({
      viewingAll: !prevState.viewingAll
    }));

  setSortBy = (_, { value: sortBy }) => this.setState({ sortBy });

  setOrderBy = (_, { value: orderBy }) => this.setState({ orderBy });

  setPersonality = (_, { value: personality }) =>
    this.setState({ personality });

  getCollection = () => {
    const { viewingAll, sortBy, orderBy, personality } = this.state;
    const { tiles } = this.props;

    if (!viewingAll) {
      return limit(10, tiles);
    }

    let collection = tiles;

    if (personality !== "any") {
      collection = collection.filter(cow => cow.personality === personality);
    }

    if (sortBy !== "any" && orderBy !== "any") {
      collection = orderFunctions[orderBy](collection, sortBy);
    }

    return collection;
  };

  reset = () => {
    this.setState({
      sortBy: "any",
      orderBy: "any",
      personality: "any"
    });
  };

  render() {
    const { title, description, tiles, unsortable } = this.props;
    const { viewingAll, sortBy, orderBy, personality } = this.state;
    const collection = this.getCollection();

    return (
      <>
        <Segment basic attached="top">
          <Header
            as="h3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div>{title}</div>{" "}
            <small onClick={this.toggleViewingAll}>
              view {viewingAll ? "less" : "all"}
            </small>
          </Header>
          {description}
        </Segment>
        {viewingAll && !unsortable && (
          <Menu
            attached="bottom"
            widths={3}
            style={{
              margin: 0
            }}
          >
            <Dropdown
              item
              selection
              fluid
              placeholder="Sort by"
              onChange={this.setSortBy}
              value={sortBy}
              options={[
                {
                  text: "Sort by",
                  value: "any"
                }
              ].concat(
                attributeTypes.map(type => ({
                  text: attributeToEnglish[type],
                  value: type
                }))
              )}
            />
            <Dropdown
              item
              selection
              fluid
              placeholder="Order by"
              onChange={this.setOrderBy}
              value={orderBy}
              options={[
                {
                  text: "Order by",
                  value: "any"
                },
                {
                  text: "High to Low",
                  value: "highToLow"
                }
              ]}
            />
            <Dropdown
              item
              selection
              fluid
              placeholder="Personality"
              onChange={this.setPersonality}
              value={personality}
              options={[
                {
                  text: "Personality",
                  value: "any"
                }
              ].concat(
                personalityTypes.map(type => ({
                  text: type,
                  value: type
                }))
              )}
            />
          </Menu>
        )}
        <Panel
          attached="bottom"
          style={{
            maxHeight: "30rem",
            overflow: "auto"
          }}
        >
          {sortBy !== "any" && orderBy !== "any" && collection.length > 0 && (
            <>
              <Segment attached="top">
                Sorting cows by {sortBy}, ordered {orderToEnglish[orderBy]}.
              </Segment>
              <Button
                attached="bottom"
                onClick={this.reset}
                style={{
                  marginBottom: "1rem"
                }}
              >
                Clear
              </Button>
            </>
          )}
          {collection.map((tile, index) => (
            <Tile key={index} {...tile} />
          ))}
          {collection.length === 0 && (
            <>
              <Segment attached="top">
                No cows match the provided filter.
              </Segment>
              <Button attached="bottom" onClick={this.reset}>
                Clear
              </Button>
            </>
          )}
          {!viewingAll && tiles.length - 10 > 0 && (
            <div style={{ textAlign: "right" }}>
              ...and {tiles.length - 10} more.
            </div>
          )}
        </Panel>
      </>
    );
  }
}
