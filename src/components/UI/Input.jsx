import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    color: "#111111",
    borderStyle: "solid",
    borderWidth: "1px",
    boxSizing: "border-box",
    borderRadius: theme.spacing(0.5),
    borderColor: "#767676",
    transition: "border-color 0.25s ease-out",
    backgroundColor: "transparent",
    padding: theme.spacing(1, 1.5),
    fontSize: "1rem",
    outline: "none",
    height: theme.spacing(5),
  },

  error: {
    borderColor: theme.palette.error.main,
  },

  label: {
    marginBottom: theme.spacing(0.5),
  },
}));

function Input({
  className,
  label,
  id,
  validated = true,
  description,
  ...props
}) {
  const classes = useStyles();
  return (
    <Box>
      <label htmlFor={id}>
        <Typography
          variant="body1"
          color={validated ? "inherit" : "error"}
          gutterBottom
        >
          {label}
          {description && (
            <Typography variant="body1" color="textSecondary" component="span">
              &nbsp;({description})
            </Typography>
          )}
        </Typography>
      </label>
      <input
        id={id}
        className={clsx(className, classes.input, !validated && classes.error)}
        {...props}
      />
    </Box>
  );
}

export default Input;
