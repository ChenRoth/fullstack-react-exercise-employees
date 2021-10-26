import React from "react";
import { Button } from "react-bootstrap";
import { StateContext } from "../../app-state";

export class HomePage extends React.Component {
  render() {
    return (
      <StateContext.Consumer>
        {({ appState, setAppState }) => {
          return (
            <div>
              <h6>Welcome to SoftTech!</h6>
            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}
