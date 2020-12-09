import React, { useContext, Fragment } from "react";

import { Redirect } from "react-router-dom";
import Context from "../Context";

import { Header } from "../components/";

import { Box } from "@material-ui/core";

function PrivateRoute({ Component }) {
  const {
    auth: { isAuth },
  } = useContext(Context);

  return (
    <Fragment>
      {isAuth !== null &&
        (isAuth ? (
          <Box>
            <Header />

            <Component />
          </Box>
        ) : (
          <Redirect to="/login" />
        ))}
    </Fragment>
  );
}

export default PrivateRoute;
