import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StateContext } from "../../app-state";

export class EmployeeListPage extends React.Component {
  render() {
    return (
      <StateContext.Consumer>
        {({ appState, setAppState }) => {
          const { employees } = appState;

          if (!employees.length) {
            return <div>There are no employees yet!</div>;
          }
          return (
            <ListGroup>
              {employees.map((employee) => (
                <ListGroupItem key={employee.id}>
                  <Link to={`/employees/${employee.id}`}>
                    Employee #{employee.id}
                  </Link>
                </ListGroupItem>
              ))}
              <ListGroupItem>
                <Link to={`employees/nope`}>Employee that doesn't exist redirects to /employees!</Link>
              </ListGroupItem>
            </ListGroup>
          );
        }}
      </StateContext.Consumer>
    );
  }
}
