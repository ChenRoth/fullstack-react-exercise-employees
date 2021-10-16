import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { StateContext } from "../../app-state";

interface Props {
  id: string;
}

export class DetailsPage extends React.Component<Props> {
  render() {
    const { id } = this.props;
    const idAsNumber = Number(id);
    return (
      <StateContext.Consumer>
        {({ appState, setAppState }) => {
          const { employees } = appState;
          const employee = employees.find((e) => e.id === idAsNumber);
          if (!employee) {
            return <Redirect to="/employees" />;
          }
          return (
            <div>
              <Link to="/employees">Back to Employee List</Link>
              <h6>Showing details for ID #{id}</h6>
              <p>{employee.firstName}</p>
            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}
