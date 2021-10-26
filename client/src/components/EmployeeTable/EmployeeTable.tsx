import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StateContext } from "../../app-state";

export class EmployeeTable extends React.Component {
  render() {
    return (
      <StateContext.Consumer>
        {({ appState, setAppState }) => {
          const { employees } = appState;

          if (!employees.length) {
            return "No Employees to Display";
          }
          return (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>
                        {" "}
                        <Link to={`/employees/details/${employee.id}`}>
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}
