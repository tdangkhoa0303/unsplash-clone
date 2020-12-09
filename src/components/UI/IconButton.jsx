import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

function IconButton({ children, variant, className, ...props }) {
  let styles;
  switch (variant) {
    case "bordered":
      styles = {
        backgroundColor: "#ffffff",
        borderColor: "#d1d1d1",

        "&:hover": {
          borderColor: "#767676",
          color: "#111111",
        },
      };
      break;
    default:
      styles = {
        backgroundColor: "hsla(0,0%,100%,.9)",

        "&:hover": {
          color: "#111111",
          backgroundColor: "#ffffff",
        },
      };
  }
  const classes = makeStyles((theme) => ({
    button: {
      outline: "none",
      boxShadow: "0 1px 2px rgba(0,0,0,.06)",
      height: theme.spacing(4),
      padding: theme.spacing(0, 1.5),
      display: "flex",
      alignItems: "center",
      borderRadius: theme.spacing(0.5),
      border: "1px solid transparent",
      color: "#767676",
      cursor: "pointer",
      transition: "0.2s all ease-out",

      "& > *": {
        fontSize: theme.spacing(2.5),
      },

      ...styles,
    },
  }))();

  return (
    <button className={clsx(classes.button, className)} {...props}>
      {children}
    </button>
  );
}

export default IconButton;
