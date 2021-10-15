import React from "react";
import { Button } from "react-bootstrap";
import { StateContext } from "../../app-state";

export class HomePage extends React.Component {
  render() {
    return (
      <StateContext.Consumer>
        {({ appState, setAppState }) => {
          const { message } = appState;
          return (
            <div>
              <h6>This example shows how to use StateContext</h6>
              <p>Message: {message}</p>
              <Button variant="success" onClick={() => setAppState({ message: "Goodbye!" })}>
                Change Message
              </Button>
            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}
