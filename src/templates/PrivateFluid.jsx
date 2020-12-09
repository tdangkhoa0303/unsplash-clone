import React, { useContext, Fragment } from "react";

import { Redirect } from "react-router-dom";
import Context from "../Context";

function PrivateRoute({ Component }) {
  const {
    auth: { isAuth },
  } = useContext(Context);

  return (
    <Fragment>
      {isAuth !== null && (isAuth ? <Component /> : <Redirect to="/login" />)}
    </Fragment>
  );
}

export default PrivateRoute;
