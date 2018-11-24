import React, { Component } from "react";
import Home from "./components/Home/Home";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="/api/auth/google">Login With Google</a>
        <Route exact path="/home/:token?" component={Home} />
      </div>
    );
  }
}

export default App;
