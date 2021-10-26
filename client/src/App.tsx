import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AppState, StateContext } from "./app-state";
import "./App.css";
import { Header } from "./components/Header/Header";
import { mainPages } from "./pages";
import { DetailsPage } from "./pages/DetailsPage/DetailsPage";
import { HomePage } from "./pages/HomePage/HomePage";

export const API_URL = "http://localhost:4000/api";

export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    employees: [],
    employeeDetails: null,
    departments: [],
    titles: [],
  };

  setAppState = (newAppState: Partial<AppState>) => {
    this.setState(newAppState as any);
  };

  async componentDidMount() {
    const { data: titles } = await axios.get<string[]>(`${API_URL}/titles`);
    this.setAppState({
      titles,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <StateContext.Provider
          value={{ appState: this.state, setAppState: this.setAppState }}
        >
          <Header />
          <Container className="content">
            <Row>
              <Switch>
                <Route exact path="/employees/details/:id">
                  {({ match, history }) => (
                    <DetailsPage
                      onEmployeeRemoved={() => history.push("/")}
                      id={match!.params.id}
                    />
                  )}
                </Route>
                {mainPages.map((page) => (
                  <Route
                    key={page.path}
                    path={page.path}
                    component={page.component}
                  />
                ))}
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Row>
          </Container>
        </StateContext.Provider>
      </BrowserRouter>
    );
  }
}
