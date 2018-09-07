import React, { Component } from "react";
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import {
  fetchPersons,
  sortTable,
  editPersonStart,
  deletePerson,
  clearErrors
} from "../../store/actions";
import { Table, Dimmer, Header, Loader, Icon } from "semantic-ui-react";

class PersonList extends Component {
  componentDidMount() {
    this.props.onFetchPerosns();
  }

  render() {
    const { column, direction, persons, loading, errors } = this.props;
    return (
      <div>
        <Dimmer active={loading} inverted page>
          <Loader size='medium'>Loading</Loader>
          <Header inverted>
            Fetching Data
          </Header>
        </Dimmer>
        <Dimmer active={errors} onClickOutside={this.props.onClearErrors} page>
          <Header as='h2' icon inverted>
            <Icon name='bug' />            
            Something went wrong
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
PersonList.propTypes = {
  onFetchPerosns: PropTypes.func.isRequired,
  onEditPersonStart: PropTypes.func.isRequired,
  onDeletePerson: PropTypes.func.isRequired,
  onSortTable: PropTypes.func.isRequired,
  onClearErrors: PropTypes.func.isRequired,
  persons: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.string,
  direction: PropTypes.string,
  loading: PropTypes.bool,
  errors: PropTypes.object,
}
const mapStateToProps = state => ({
  persons: state.persons,
  errors: state.errors,
  column: state.sortColumn,
  direction: state.direction,
  loading: state.loading,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  onFetchPerosns: () => dispatch(fetchPersons()),
  onEditPersonStart: person => dispatch(editPersonStart(person)),
  onDeletePerson: _id => dispatch(deletePerson(_id)),
  onSortTable: sortColumn => dispatch(sortTable(sortColumn)),
  onClearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonList);
