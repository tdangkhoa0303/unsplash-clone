import { Fragment } from "react";

import { Header } from "../components/";

function PublicRoute({ Component }) {
  return (
    <Fragment>
      <Header />
      <Component />
    </Fragment>
  );
}

export default PublicRoute;
