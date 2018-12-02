import React, { Component } from "react";
import Home from "./components/Home/Home";
import { Route, withRouter } from "react-router-dom";
import { fetchUser } from "./store/actions/profile/profile";
import { connect } from "react-redux";
import AddPage from "./components/admin/AddPage/AddPage";

import AdminPages from "./components/admin/AdminPages/AdminPages";
import EditPage from "./components/admin/EditPage/EditPage";
import AddCategory from "./components/admin/AddCategory/AddCategory";
import AdminCategories from "./components/admin/AdminCategories/AdminCategories";
import EditCategory from "./components/admin/EditCategory/EditCategory";
import AdminProducts from "./components/admin/AdminProducts/AdminProducts";
import AddProduct from "./components/admin/AddProduct/AddProduct";
import EditProduct from "./components/admin/EditProduct/EditProduct";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };

  render() {
    return (
      <div className="App">
        <a href="/api/auth/google">Login With Google</a>
        <Route exact path="/home/:token?" component={Home} />
        {/* All the admin routes */}
        <Route exact path="/admin/add-page" component={AddPage} />
        <Route exact path="/admin/add-category" component={AddCategory} />
        <Route exact path="/admin/add-product" component={AddProduct} />
        <Route exact path="/admin/edit-page/:id" component={EditPage} />
        <Route exact path="/admin/edit-category/:id" component={EditCategory} />
        <Route exact path="/admin/edit-product/:id" component={EditProduct} />
        <Route exact path="/admin/pages" component={AdminPages} />
        <Route exact path="/admin/categories" component={AdminCategories} />
        <Route exact path="/admin/products" component={AdminProducts} />

        {/* General User Routes */}
        <Route exact path="/products" component={Products} />
        <Route exact path="/product/:id" component={Product} />
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
