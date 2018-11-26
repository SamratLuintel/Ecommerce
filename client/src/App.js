import React, { Component } from "react";
import Home from "./components/Home/Home";
import { Route, withRouter } from "react-router-dom";
import { fetchUser } from "./store/actions/profile/profile";
import { connect } from "react-redux";
import AddPage from "./components/admin/AddPage/AddPage";
import Pages from "./components/Pages/Pages";
import EditPage from "./components/admin/EditPage/EditPage";

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };

  render() {
    return (
      <div className="App">
        <a href="/api/auth/google">Login With Google</a>
        <Route exact path="/home/:token?" component={Home} />
        <Route exact path="/admin/add-page" component={AddPage} />
        <Route exact path="/admin/edit-page/:id" component={EditPage} />
        <Route exact path="/pages" component={Pages} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { fetchUser }
  )(App)
);
