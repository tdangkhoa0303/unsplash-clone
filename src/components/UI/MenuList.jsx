import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  menu: {
    listStyle: "none",
    display: "flex",
    padding: theme.spacing(0, 4),
    margin: 0,

    [theme.breakpoints.down("xl")]: {
      padding: theme.spacing(0, 2),
    },
  },
}));

const MenuList = ({ children, className }) => {
  const classes = useStyles();
  return <ul className={clsx(classes.menu, className)}>{children}</ul>;
};

export default MenuList;
