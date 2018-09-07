import React, { Component } from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";

const tableData = [
  { name: "John", age: 15, gender: "Male" },
  { name: "Amber", age: 40, gender: "Female" },
  { name: "Leslie", age: 25, gender: "Female" },
  { name: "Ben", age: 70, gender: "Male" }
];

class PersonList extends Component {
  state = {
    column: "name",
    data: tableData,
    direction: "ascending"
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, data, direction } = this.state;

    return (
      <Table selectable structured sortable color="teal">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={this.handleSort("name")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "surname" ? direction : null}
                onClick={this.handleSort("surname")}
              >
                Surname
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "city" ? direction : null}
                onClick={this.handleSort("city")}
              >
                City
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "address" ? direction : null}
                onClick={this.handleSort("address")}
              >
                Address
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "phpne" ? direction : null}
                onClick={this.handleSort("phone")}
              >
                Phone
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
    );
  }
}

export default PersonList;
