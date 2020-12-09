import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dark: {
    color: "#ffffff",
    opacity: 0.8,

    "&:hover": {
      color: "#ffffff",
      opacity: 1,
    },
  },

  underlined: {
    textDecoration: "underline",
  },
}));

function CustomLink({ children, variant, className, color, ...props }) {
  const classes = useStyles();
  return (
    <Link
      className={clsx(classes[variant], classes[color], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
