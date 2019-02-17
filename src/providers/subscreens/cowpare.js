import React, { Component } from "react";
import { Header, Icon, Image, Segment, Table } from "semantic-ui-react";

import {
  AspectTable,
  AttributeTable,
  TileSet,
  TraitTable
} from "../../components";
import { getLocalCows } from "../../helpers";
import { BrandService, UpstreamService } from "../../services";
import { CowpareContext } from "../cowpare";

class AbstractCowpareSubscreen extends Component {
  state = {
    cows: []
  };

  async componentDidMount() {
    document.getElementById("drawer").scrollTo(0, 0);

    const cows = await (process.env.NODE_ENV === "production"
      ? UpstreamService.getCowsForSale()
      : getLocalCows());

    this.setState({ cows });
  }

  render() {
    const { setDependent, independent, dependent } = this.props;
    const { cows } = this.state;

    return (
      <>
        <Segment>
          <Table
            unstackable
            columns={3}
            style={{
              marginTop: 0
            }}
          >
            <Table.Body>
              <Table.Row>
                {/* Placeholder */}
                <Table.Cell />
                <Table.Cell textAlign="center">
                  <Image
                    src={independent.image}
                    centered
                    style={{
                      width: "64px",
                      height: "64px"
                    }}
                  />
                  <Header
                    as="p"
                    content={BrandService.getName(independent.id)}
                    style={{
                      marginTop: "0.5rem"
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {dependent ? (
                    <>
                      <Image
                        src={dependent.image}
                        centered
                        style={{
                          width: "64px",
                          height: "64px"
                        }}
                      />
                      <Header
                        as="p"
                        content={BrandService.getName(dependent.id)}
                        style={{
                          marginTop: "0.5rem"
                        }}
                      />
                    </>
                  ) : (
                    <Icon name="question" />
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        {dependent && (
          <Segment>
            <TraitTable cows={[independent, dependent]} />
            <AspectTable cows={[independent, dependent]} />
            <AttributeTable cows={[independent, dependent]} />
          </Segment>
        )}
        <TileSet
          unbounded
          title="Select a Cow to cowpare against."
          tiles={cows.map(cow => ({
            ...cow,
            onClick: () => {
              setTimeout(
                () => document.getElementById("drawer").scrollTo(0, 0),
                0
              );
              setDependent(cow);
            }
          }))}
        />
      </>
    );
  }
}

export default function CowpareSubscreen() {
  return (
    <CowpareContext.Consumer>
      {({ setDependent, independent, dependent }) => (
        <AbstractCowpareSubscreen
          setDependent={setDependent}
          independent={independent}
          dependent={dependent}
        />
      )}
    </CowpareContext.Consumer>
  );
}
