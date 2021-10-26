import axios from "axios";
import React, { ChangeEvent } from "react";
import { Form, Spinner } from "react-bootstrap";
import { API_URL } from "../../App";
import { StateContext } from "../../app-state";
import { DepartmentModel } from "../../models/department.model";
import { EmployeeListingModel } from "../../models/employeeListing.model";

interface State {
  manager: EmployeeListingModel | null;
}

export class DepartmentSearch extends React.Component<{}, State> {
  state: State = {
    manager: null,
  };
  static contextType = StateContext;
  context!: React.ContextType<typeof StateContext>;

  async componentDidMount() {
    const { setAppState } = this.context;
    const { data: departments } = await axios.get<DepartmentModel[]>(
      `${API_URL}/departments`
    );
    setAppState({ departments });
  }

  onSelectDepartment = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { setAppState } = this.context;

    const departmentId = event.target.value;
    const {
      data: { employees, manager },
    } = await axios.get<{
      employees: EmployeeListingModel[];
      manager: EmployeeListingModel;
    }>(`${API_URL}/employees/search/department/${departmentId}?page=0&size=10`);
    
    this.setState({manager});
    setAppState({ employees });
  };

  render() {
    const { appState } = this.context;
    const { departments } = appState;
    const { manager } = this.state;
    if (!departments.length) {
      return <Spinner animation="border" />;
    }

    return (
      <div>
        <Form.Select onChange={this.onSelectDepartment}>
          <option>Select Department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Form.Select>
        {manager ? `Manager: ${manager.firstName} ${manager.lastName}` : null}
      </div>
    );
  }
}
