import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({
  authorize,
  layout: Layout,
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const user = useSelector((state) => state.auth.userLogged);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          if (!authorize || (authorize && authorize === user.role)) {
            if (Layout) {
              return (
                <Layout>
                  <Component {...props} />
                </Layout>
              );
            } else {
              return <Component {...props} />;
            }
          } else {
            return <Redirect to="/login" />;
          }
        }
      }}
    />
  );
};

export default PrivateRoute;
