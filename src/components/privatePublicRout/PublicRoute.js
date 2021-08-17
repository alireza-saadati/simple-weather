import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../app/Utils";
import PropTypes from "prop-types";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/search" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  restricted: PropTypes.bool,
};

export default PublicRoute;
