import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./context/TeacherContext";

function ProtectedRoute({ component: Component, logout, ...rest }) {
  const { isAuthenticated } = useContext(UserContext);
  // console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component logout={logout} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
