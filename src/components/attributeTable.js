import React from "react";
import { Table } from "semantic-ui-react";

export default function AttributeTable({ cows }) {
  const Cell = ({ children }) => (
    <Table.Cell textAlign={cows.length > 1 ? "center" : "right"}>
      {children}
    </Table.Cell>
  );

  return (
    <Table unstackable columns={1 + cows.length}>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={2}>
            <strong>Attributes</strong>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Strength</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.attributes.strength}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Dexterity</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.attributes.dexterity}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Constitution</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.attributes.constitution}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Intelligence</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.attributes.intelligence}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Wisdom</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.attributes.wisdom}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Charisma</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.attributes.charisma}</Cell>
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
