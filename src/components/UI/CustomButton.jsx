import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dark: {
    color: "#ffffff",
    backgroundColor: "#111111",
    height: theme.spacing(4),

    "&:hover": {
      backgroundColor: "#111111",
    },

    "&.Mui-disabled": {
      color: "#ffffff !important",
      cursor: "not-allowed",
    },
  },
}));

function CustomButton({ color, children, variant, className, ...props }) {
  const classes = useStyles();
  return (
    <Button
      variant={variant}
      className={clsx(classes[color], className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
