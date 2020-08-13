import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ layout: Layout, component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return;
        } else {
          if (Layout) {
            return (
              <Layout>
                <Component {...props} />
              </Layout>
            );
          } else {
            return <Component {...props} />;
          }
        }
      }}
    />
  );
};

export default PublicRoute;
