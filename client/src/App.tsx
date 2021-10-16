import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AppState, StateContext } from "./app-state";
import "./App.css";
import { Header } from "./components/Header/Header";
import { mainPages } from "./pages";
import { DetailsPage } from "./pages/DetailsPage/DetailsPage";

export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    message: "hello there!",
    employees: [],
  };

  setAppState = (newAppState: Partial<AppState>) => {
    this.setState(newAppState as any);
  };

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
                {mainPages.map((page) => (
                  <Route
                    key={page.path}
                    exact
                    path={page.path}
                    component={page.component}
                  />
                ))}
                <Route path="/employees/:id">
                  {({ match }) => <DetailsPage id={match!.params.id} />}
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
