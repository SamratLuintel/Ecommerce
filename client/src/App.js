import React, { Component } from "react";
import Home from "./components/Home/Home";
import { Route, withRouter, Switch } from "react-router-dom";
import { fetchUser } from "./store/actions/profile/profile";
import { connect } from "react-redux";
import AddCategory from "./components/admin/AddCategory/AddCategory";
import AdminCategories from "./components/admin/AdminCategories/AdminCategories";
import EditCategory from "./components/admin/EditCategory/EditCategory";
import AdminProducts from "./components/admin/AdminProducts/AdminProducts";
import AddProduct from "./components/admin/AddProduct/AddProduct";
import EditProduct from "./components/admin/EditProduct/EditProduct";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import { fetchCart } from "./store/actions/carts/carts";
import Checkout from "./components/Checkout/Checkout";
import AdminDashboard from "./components/admin/AdminDashboard/AdminDashboard";
import Categories from "./components/Categories/Categories";
import FindProduct from "./components/FindProduct/FindProduct";
import PrivateRoute from "./hoc/PrivateRoute";
import ApplicationHeaderContextProvider from "./components/common/ApplicationHeader/ApplicationHeaderContextProvider";
import { fetchKeys } from "./store/actions/profile/profileInfo";

class App extends Component {
  componentDidMount = async () => {
    try {
      this.props.fetchKeys();
      await this.props.fetchUser();
      this.props.fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.profile.authenticated !== this.props.profile.authenticated &&
      this.props.profile.authenticated
    ) {
      this.props.fetchCart();
    }
  };

  render() {
    return (
      <ApplicationHeaderContextProvider>
        <div className="App">
          {/* All the admin routes */}
          <Route exact path="/admin/add-category" component={AddCategory} />
          <Route exact path="/admin/add-product" component={AddProduct} />
          <Route
            exact
            path="/admin/edit-category/:id"
            component={EditCategory}
          />

          <Route exact path="/admin/categories" component={AdminCategories} />
          <Route exact path="/admin/products" component={AdminProducts} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <PrivateRoute
            exact
            path="/admin/edit-product/:id"
            component={EditProduct}
          />

          {/* General User Routes */}

          <Route exact path="/categories/:id" component={Categories} />
          <Route exact path="/product/:id" component={Product} />

          <Route exact path="/findproduct/:text" component={FindProduct} />
          <Switch>
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/:token?" component={Home} />
          </Switch>
        </div>
      </ApplicationHeaderContextProvider>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchUser, fetchCart, fetchKeys }
  )(App)
);
