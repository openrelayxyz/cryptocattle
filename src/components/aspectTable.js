import React from "react";
import { Table } from "semantic-ui-react";

import { sizeToEnglish } from "../helpers";

export default function AspectTable({ cows }) {
  const Cell = ({ children }) => (
    <Table.Cell textAlign={cows.length > 1 ? "center" : "right"}>
      {children}
    </Table.Cell>
  );

  return (
    <Table unstackable columns={1 + cows.length}>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={1 + cows.length}>
            <strong>Aspects</strong>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Horn</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>
              {cow.aspects.horn.identifier},{" "}
              {sizeToEnglish[cow.aspects.horn.size]}
            </Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Wing</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>
              {cow.aspects.wing.identifier},{" "}
              {sizeToEnglish[cow.aspects.wing.size]}
            </Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Hair</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.aspects.hair.identifier}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Spot</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.aspects.spot.identifier}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Accessory</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.aspects.accessory.identifier}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Body</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.aspects.body.identifier}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Emote</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.aspects.emote.identifier}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Tail</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>
              {cow.aspects.tail.identifier},{" "}
              {sizeToEnglish[cow.aspects.tail.size]}
            </Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Leg</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.aspects.leg.identifier}</Cell>
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
