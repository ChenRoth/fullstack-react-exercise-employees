import axios from "axios";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StateContext } from "../../app-state";
import { EmployeeModel } from "../../models/employee.model";

export class EmployeeListPage extends React.Component {
  static contextType = StateContext;
  context!: React.ContextType<typeof StateContext>;

  async componentDidMount() {
    const { setAppState } = this.context;
    const {data: employees} = await axios.get<EmployeeModel[]>('http://localhost:4000/api/employees');
    setAppState({
      employees,
    });
  }

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
