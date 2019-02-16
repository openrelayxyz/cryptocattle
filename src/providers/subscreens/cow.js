import React from "react";
import { Header, Image, Menu, Segment, Table } from "semantic-ui-react";

import { BrandService } from "../../services";
import { DrawerContext, SubscreenType } from "../drawer";

function AbstractCowSubscreen({
  open,
  cow: {
    id,
    image,
    description,
    attributes: {
      generation,
      moofactoryPeriod,
      personalityType,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    },
    forSale
  },
  isOwned
}) {
  return (
    <>
      <Segment
        attached="top"
        style={{
          margin: 0
        }}
      >
        <Header content={BrandService.getName(id)} subheader={description} />
      </Segment>
      <Segment attached>
        <Image src={image} />
      </Segment>
      <Segment attached>
        <Table unstackable columns={2}>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan={2}>
                <strong>Traits</strong>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Generation</Table.Cell>
              <Table.Cell textAlign="right">{generation}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Moofactory Period</Table.Cell>
              <Table.Cell textAlign="right">
                {(parseInt(moofactoryPeriod) / 60 / 60).toFixed(2)} hours
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Personality</Table.Cell>
              <Table.Cell textAlign="right">{personalityType}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table unstackable columns={2}>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan={2}>
                <strong>Attributes</strong>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Strength</Table.Cell>
              <Table.Cell textAlign="right">{strength}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Dexterity</Table.Cell>
              <Table.Cell textAlign="right">{dexterity}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Constitution</Table.Cell>
              <Table.Cell textAlign="right">{constitution}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Intelligence</Table.Cell>
              <Table.Cell textAlign="right">{intelligence}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Wisdom</Table.Cell>
              <Table.Cell textAlign="right">{wisdom}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Charisma</Table.Cell>
              <Table.Cell textAlign="right">{charisma}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
      <Menu
        size="massive"
        attached
        vertical
        fluid
        items={[
          {
            key: 0,
            icon: "usd",
            content: isOwned ? (forSale ? "Cancel Sale" : "Sell") : "For Sale"
          },
          {
            key: 1,
            icon: "users",
            content: "Cowpare"
          }
        ].concat(
          isOwned
            ? {
                key: 2,
                icon: "user",
                content: "Brand",
                onClick: () => open(SubscreenType.BrandSubscreen, { id })
              }
            : null
        )}
      />
    </>
  );
}

export default function CowSubscreen() {
  return (
    <DrawerContext.Consumer>
      {({ open, subscreenProps: { cow, isOwned } }) => (
        <AbstractCowSubscreen open={open} cow={cow} isOwned={isOwned} />
      )}
    </DrawerContext.Consumer>
  );
}
