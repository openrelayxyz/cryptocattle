import React, { Component } from "react";
import {
  Button,
  Dropdown,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from "semantic-ui-react";

import { personalityTypes, aspectTypes, attributeTypes } from "../constants";
import { limit, sizeToEnglish } from "../helpers";
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

const capitalize = word =>
  word
    .split("")
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join("");

const sentencify = phrase => {
  const arr = phrase.split("");
  arr[arr.length - 1] = ".";
  return arr.join("");
};

const getEnglishedAspect = (aspect, value) => {
  const [identifier, size] = value.split("_");
  const shouldIncludeSize = ["wing", "horn", "tail"].includes(aspect);

  return shouldIncludeSize
    ? `${identifier}, sized ${sizeToEnglish[size]}`
    : identifier;
};

export default class TileSet extends Component {
  state = {
    viewingAll: Boolean(this.props.unbounded),
    viewingAspectFilter: false,
    sortBy: "any",
    orderBy: "any",
    personality: "any",
    horn: "any",
    wing: "any",
    hair: "any",
    accessory: "any",
    body: "any",
    emote: "any",
    tail: "any",
    leg: "any"
  };

  toggleViewingAll = () =>
    !this.props.unbounded &&
    this.setState(
      prevState => ({
        viewingAll: !prevState.viewingAll,
        viewingAspectFilter: false
      }),
      this.reset
    );

  toggleViewingAspectFilter = () =>
    this.setState(prevState => ({
      viewingAspectFilter: !prevState.viewingAspectFilter
    }));

  setSortBy = (_, { value: sortBy }) => this.setState({ sortBy });

  setOrderBy = (_, { value: orderBy }) => this.setState({ orderBy });

  setPersonality = (_, { value: personality }) =>
    this.setState({ personality });

  setHorn = (_, { value: horn }) => this.setState({ horn });

  setWing = (_, { value: wing }) => this.setState({ wing });

  setHair = (_, { value: hair }) => this.setState({ hair });

  setAccessory = (_, { value: accessory }) => this.setState({ accessory });

  setBody = (_, { value: body }) => this.setState({ body });

  setEmote = (_, { value: emote }) => this.setState({ emote });

  setTail = (_, { value: tail }) => this.setState({ tail });

  setLeg = (_, { value: leg }) => this.setState({ leg });

  getCollection = () => {
    const { viewingAll, sortBy, orderBy, personality } = this.state;
    const { tiles } = this.props;
    const conditions = {};

    if (!viewingAll) {
      return limit(10, tiles);
    }

    if (personality !== "any") {
      conditions.personalityType = personality;
    }

    Object.keys(aspectTypes).forEach(type => {
      if (this.state[type] !== "any") {
        conditions[type] = this.state[type];
      }
    });

    const filteredCollection = tiles.filter(cow => {
      if (
        conditions.personalityType &&
        cow.attributes.personalityType !== conditions.personalityType
      ) {
        return false;
      }

      let fulfillsAspectConditions = true;

      Object.keys(aspectTypes).forEach(type => {
        if (conditions[type]) {
          const [identifier, size] = this.state[type].split("_");

          if (
            cow.aspects[type].identifier !== identifier ||
            cow.aspects[type].size !== size
          ) {
            fulfillsAspectConditions = false;
          }
        }
      });

      return fulfillsAspectConditions;
    });

    if (sortBy !== "any" && orderBy !== "any") {
      return orderFunctions[orderBy](filteredCollection, sortBy);
    }

    return filteredCollection;
  };

  getAppliedFilter = () => {
    const {
      sortBy,
      orderBy,
      personality,
      horn,
      wing,
      hair,
      accessory,
      body,
      emote,
      tail,
      leg
    } = this.state;
    const sortedAndOrdered = ![sortBy, orderBy].includes("any");
    const personalitySelected = personality !== "any";
    const aspectSelected = [
      horn,
      wing,
      hair,
      accessory,
      body,
      emote,
      tail,
      leg
    ].some(el => el !== "any");

    if (!sortedAndOrdered && !personalitySelected && !aspectSelected) {
      return false;
    }

    const amount = this.getCollection().length;

    let phrase = `Showing ${amount} cows,`;

    if (personalitySelected) {
      const startsWithVowel = ["a", "e", "i", "o", "u"].includes(
        personality.toLocaleLowerCase()[0]
      );

      phrase += ` with ${
        startsWithVowel ? "an" : "a"
      } ${personality.toLocaleLowerCase()} personality,`;
    }

    Object.keys(aspectTypes).forEach(type => {
      if (this.state[type] !== "any") {
        const startsWithVowel = ["a", "e", "i", "o", "u"].includes(
          type.toLocaleLowerCase()[0]
        );

        phrase += ` with ${
          startsWithVowel ? "an" : "a"
        } ${type} type of ${getEnglishedAspect(type, this.state[type])},`;
      }
    });

    if (sortedAndOrdered) {
      phrase += ` sorted by ${
        sortBy === "moofactoryPeriod" ? "moofactory period" : sortBy
      }, ordered ${orderToEnglish[orderBy]},`;
    }

    return sentencify(phrase);
  };

  reset = () => {
    this.setState({
      sortBy: "any",
      orderBy: "any",
      personality: "any",
      horn: "any",
      wing: "any",
      hair: "any",
      accessory: "any",
      body: "any",
      emote: "any",
      tail: "any",
      leg: "any"
    });
  };

  render() {
    const {
      image,
      title,
      description,
      tiles,
      unsortable,
      unbounded
    } = this.props;
    const {
      viewingAll,
      viewingAspectFilter,
      sortBy,
      orderBy,
      personality
    } = this.state;
    const collection = this.getCollection();
    const appliedFilter = this.getAppliedFilter();

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
            <div
              className="fancy"
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              {image && (
                <Image
                  src={image}
                  style={{
                    width: "48px",
                    height: "48px",
                    marginRight: "0.5rem"
                  }}
                />
              )}
              {title}
            </div>{" "}
            {!unbounded && (
              <small onClick={this.toggleViewingAll}>
                {viewingAll ? "less" : "all"}
              </small>
            )}
          </Header>
          {description}
        </Segment>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            visible={viewingAspectFilter}
            animation="overlay"
            vertical
            width="wide"
          >
            <Menu.Item header>
              <Icon name="filter" /> Filter Aspects
            </Menu.Item>
            <Menu.Item onClick={this.toggleViewingAspectFilter}>
              <Icon name="close" /> Close
            </Menu.Item>
            {Object.entries(aspectTypes).map(([key, value]) => (
              <Menu.Item key={key}>
                <label
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase"
                  }}
                >
                  {key}
                </label>
                <Dropdown
                  selection
                  fluid
                  placeholder={capitalize(key)}
                  onChange={this[`set${capitalize(key)}`]}
                  value={this.state[key]}
                  options={[
                    {
                      text: "any",
                      value: "any"
                    }
                  ].concat(
                    aspectTypes[key].map(option => ({
                      text: ["wing", "horn", "tail"].includes(key)
                        ? `${option.identifier}, ${option.size}`
                        : option.identifier,
                      value: `${option.identifier}_${option.size}`
                    }))
                  )}
                  style={{
                    marginTop: "0.5rem"
                  }}
                />
              </Menu.Item>
            ))}
            <Menu.Item onClick={this.toggleViewingAspectFilter}>
              <Icon name="close" /> Close
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {viewingAll && !unsortable && (
              <>
                <Menu
                  attached="bottom"
                  widths={2}
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
                      },
                      {
                        text: "Low to High",
                        value: "lowToHigh"
                      }
                    ]}
                  />
                </Menu>
                <Menu
                  attached="bottom"
                  widths={2}
                  style={{
                    margin: 0
                  }}
                >
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
                  <Menu.Item
                    content="Aspects"
                    onClick={this.toggleViewingAspectFilter}
                  />
                </Menu>
              </>
            )}
            <Panel
              attached="bottom"
              style={{
                maxHeight: unbounded ? "none" : "30rem",
                overflow: unbounded ? "initial" : "auto"
              }}
            >
              {appliedFilter && collection.length > 0 && (
                <>
                  <Segment attached="top">{appliedFilter}</Segment>
                  <Button
                    attached="bottom"
                    onClick={this.reset}
                    className="fancy"
                    style={{
                      marginBottom: "1rem"
                    }}
                  >
                    Clear Filter
                  </Button>
                </>
              )}
              {collection.map((tile, index) => (
                <Tile key={index} {...tile} />
              ))}
              {collection.length === 0 && (
                <>
                  <Segment attached="top">
                    {appliedFilter
                      ? "Nothing matches the provided filter."
                      : "There is nothing in this collection."}
                  </Segment>
                  {appliedFilter && (
                    <Button attached="bottom" onClick={this.reset}>
                      Clear
                    </Button>
                  )}
                </>
              )}
              {!viewingAll && tiles.length - 10 > 0 && (
                <div style={{ textAlign: "right" }}>
                  ...and {tiles.length - 10} more.
                </div>
              )}
            </Panel>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    );
  }
}
