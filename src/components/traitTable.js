import React from "react";
import { Table } from "semantic-ui-react";
import Chance from "chance";

const chance = new Chance();
const random = (min, max) => chance.integer({ min, max });

export default function TraitTable({ cows }) {
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
            <strong>Traits</strong>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Generation</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{random(0, 6)}</Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Moofactory Period</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>
              {cow.attributes.moofactoryPeriod === "-"
                ? "-"
                : (parseInt(cow.attributes.moofactoryPeriod) / 60 / 60).toFixed(
                    2
                  ) + " hours"}
            </Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Personality</Table.Cell>
          {cows.map((cow, index) => (
            <Cell key={index}>{cow.attributes.personalityType}</Cell>
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
