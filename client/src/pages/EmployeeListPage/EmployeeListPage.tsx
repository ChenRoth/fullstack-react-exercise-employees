import React from "react";
import { ListGroup, ListGroupItem, Tab, Tabs } from "react-bootstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { StateContext } from "../../app-state";
import { DepartmentSearch } from "../../components/DepartmentSearch/DepartmentSearch";
import { EmployeeTable } from "../../components/EmployeeTable/EmployeeTable";

export class EmployeeListPage extends React.Component {
  static contextType = StateContext;
  context!: React.ContextType<typeof StateContext>;

  async componentDidMount() {}

  render() {
    return (
      <StateContext.Consumer>
        {({ appState, setAppState }) => {
          const { employees } = appState;

          return (
            <div>
              <Tabs defaultActiveKey="department">
                <Tab eventKey="department" title="Department"></Tab>
              </Tabs>
              <Switch>
                <Route path="/employees/department">
                  <DepartmentSearch />
                </Route>

                <Route path="*">
                  <Redirect to="/employees/department" />
                </Route>
              </Switch>
              <EmployeeTable />
            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}
