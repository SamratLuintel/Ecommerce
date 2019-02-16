import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";

class PrivateRoute extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      component: Component,
      RouteKey,
      location,
      profile,
      ...rest
    } = this.props;
    if (profile.fetched) {
      const Key = RouteKey ? location.pathname + location.search : null;
      return (
        <Route
          {...rest}
          render={props =>
            profile.authenticated === true ? (
              <Component
                {...props}
                key={Key}
                /**
                 * Sometimes we need to force a React Route to re-render when the
                 * search params (query) in the url changes. React Router does not
                 * do this automatically if you are on the same page when the query
                 * changes. By passing the `RouteKey`ro the `ScrollToTopRoute` and
                 * setting it to true, we are passing the combination of pathname and
                 * search params as a unique key to the component and that is a enough
                 * and clear trigger for the component to re-render without side effects
                 */
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
