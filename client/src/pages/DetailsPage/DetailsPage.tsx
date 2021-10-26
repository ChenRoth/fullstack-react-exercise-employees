import axios from "axios";
import moment from "moment";
import React, { ChangeEvent } from "react";
import { Button, Card, Col, Form, Row, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";
import { StateContext } from "../../app-state";
import { EmployeeModel } from "../../models/employee.model";

interface Props {
  id: string;
  onEmployeeRemoved(): void;
}

interface State {
  selectedTitle: string;
  shouldShowChangedTitleMessage: boolean;
}

export class DetailsPage extends React.Component<Props, State> {
  static contextType = StateContext;
  context!: React.ContextType<typeof StateContext>;

  state: State = {
    selectedTitle: "",
    shouldShowChangedTitleMessage: false,
  };

  async componentDidMount() {
    const { id } = this.props;
    const { setAppState } = this.context;

    // reset details
    setAppState({ employeeDetails: null });

    const { data: employee } = await axios.get<EmployeeModel>(
      `${API_URL}/employees/${id}`
    );
    // set details to current employee
    setAppState({ employeeDetails: employee });
    this.setState({ selectedTitle: employee.title });
  }

  selectTitle = (e: ChangeEvent<HTMLSelectElement>) => {
    const title = e.target.value;
    this.setState({ selectedTitle: title });
  };

  changeTitle = async () => {
    const { id } = this.props;
    const { selectedTitle } = this.state;
    const { setAppState, appState } = this.context;
    await axios.put(`${API_URL}/employees/${id}/title`, {
      title: selectedTitle,
    });

    // change title in app state ("local db")
    setAppState({
      employeeDetails: {
        ...appState.employeeDetails!,
        title: selectedTitle,
      },
    });

    // show a 2-second notification on successfully changing the title
    // use internal component state instead of the app state for such a transient, local effect
    this.setState({
      shouldShowChangedTitleMessage: true,
    });

    // hide the notification after 2 seconds
    setTimeout(() => {
      this.setState({
        shouldShowChangedTitleMessage: false,
      });
    }, 2000);
  };

  removeEmployee = async () => {
    const { id, onEmployeeRemoved } = this.props;
    const { setAppState } = this.context;
    await axios.delete(`${API_URL}/employees/${id}`);
    setAppState({
      employeeDetails: null,
    });
    onEmployeeRemoved();
  };

  render() {
    const { appState } = this.context;
    const { employeeDetails, titles } = appState;
    const { selectedTitle, shouldShowChangedTitleMessage } = this.state;
    if (!employeeDetails) {
      return null;
    }
    const { id, firstName, salary, gender, lastName, birthDate, hireDate } =
      employeeDetails;
    return (
      <div>
        <Link to="/employees">Back to Employee List</Link>
        <Card style={{ width: 600 }}>
          <Card.Img
            variant="top"
            src={`https://thispersondoesnotexist.com/image?=${id}`}
          />
          <Card.Body>
            <Card.Title>
              {firstName} {lastName} (#{id})
            </Card.Title>
            <p>{gender === "M" ? "Male" : "Female"}</p>
            <Row>
              <Col>
                <Form.Select onChange={this.selectTitle} value={selectedTitle}>
                  {titles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Button onClick={this.changeTitle}>Change Title</Button>
              </Col>
            </Row>
            <Toast show={shouldShowChangedTitleMessage}>
              <Toast.Body>Title has been changed!</Toast.Body>
            </Toast>
            <p>Born on {moment(birthDate).format("DD/MM/YYYY")}</p>
            <p>Been an Employee for {moment(hireDate).toNow(true)}</p>
            <p>
              Salary{" "}
              {salary.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <Button variant="danger" onClick={this.removeEmployee}>
              Fire Employee
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
