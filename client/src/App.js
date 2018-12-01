import React, { Component } from "react";
import Home from "./components/Home/Home";
import { Route, withRouter } from "react-router-dom";
import { fetchUser } from "./store/actions/profile/profile";
import { connect } from "react-redux";
import AddPage from "./components/admin/AddPage/AddPage";

import Pages from "./components/Pages/Pages";
import EditPage from "./components/admin/EditPage/EditPage";
import AddCategory from "./components/admin/AddCategory/AddCategory";
import Categories from "./components/Categories/Categories";
import EditCategory from "./components/admin/EditCategory/EditCategory";
import Products from "./components/Products/Products";
import AddProduct from "./components/admin/AddProduct/AddProduct";
import EditProduct from "./components/admin/EditProduct/EditProduct";

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
        <Route exact path="/admin/add-category" component={AddCategory} />
        <Route exact path="/admin/add-product" component={AddProduct} />
        <Route exact path="/admin/edit-page/:id" component={EditPage} />
        <Route exact path="/admin/edit-category/:id" component={EditCategory} />
        <Route exact path="/admin/edit-product/:id" component={EditProduct} />
        <Route exact path="/pages" component={Pages} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/products" component={Products} />
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
