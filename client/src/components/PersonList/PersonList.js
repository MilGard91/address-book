import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import {
  fetchPersons,
  sortTable,
  editPersonStart,
  deletePerson
} from "../../store/actions";
import { Table, Dimmer, Header, Loader } from "semantic-ui-react";

class PersonList extends Component {
  componentDidMount() {
    this.props.onFetchPerosns();
  }

  render() {
    const { column, direction, persons, loading } = this.props;
    return (
      <div>
        <Dimmer active={loading} inverted page>
          <Loader size='medium'>Loading</Loader>
          <Header inverted>
            Fetching Data
          </Header>
        </Dimmer>
        <Table selectable structured sortable color="teal">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={() => this.props.onSortTable("name")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "surname" ? direction : null}
                onClick={() => this.props.onSortTable("surname")}
              >
                Surname
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "city" ? direction : null}
                onClick={() => this.props.onSortTable("city")}
              >
                City
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "address" ? direction : null}
                onClick={() => this.props.onSortTable("address")}
              >
                Address
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "phone" ? direction : null}
                onClick={() => this.props.onSortTable("phone")}
              >
                Phone
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "createdDate" ? direction : null}
                onClick={() => this.props.onSortTable("createdDate")}
              >
                Date Created
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "createdDate" ? direction : null}
                onClick={() => this.props.onSortTable("createdDate")}
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(persons,
              ({ name, surname, city, address, phone, createdDate, _id }) => (
                <Table.Row key={_id}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{surname}</Table.Cell>
                  <Table.Cell>{city}</Table.Cell>
                  <Table.Cell>{address}</Table.Cell>
                  <Table.Cell>{phone}</Table.Cell>
                  <Table.Cell>{createdDate}</Table.Cell>
                  <Table.Cell>
                    <span
                      className="edit icon"
                      onClick={() => this.props.onEditPersonStart({ name, surname, city, address, phone, createdDate, _id })}
                    >
                      <i className="edit icon" />
                    </span>
                    <span
                      className="trash icon"
                      onClick={() => this.props.onDeletePerson(_id)}
                    >
                      <i className="trash icon" />
                    </span>
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  persons: state.persons,
  errors: state.errors,
  column: state.sortColumn,
  direction: state.direction,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  onFetchPerosns: () => dispatch(fetchPersons()),
  onEditPersonStart: person => dispatch(editPersonStart(person)),
  onDeletePerson: _id => dispatch(deletePerson(_id)),
  onSortTable: sortColumn => dispatch(sortTable(sortColumn))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonList);
