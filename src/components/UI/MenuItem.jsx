import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core";

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    fontWeight: 500,
    padding: theme.spacing(0, 1.5),
    height: "100%",
    color: "#767676",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItem: "center",

    "& *": {
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
    },
  },
}));

function MenuItem(props, ref) {
  const classes = useStyles();

  return (
    <li className={clsx(classes.menuItem, props.className)} ref={ref}>
      {props.children}
    </li>
  );
}

export default forwardRef(MenuItem);
