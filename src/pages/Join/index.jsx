import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

import * as api from "../../utils/api";

import { Grid, Box, Typography, Button } from "@material-ui/core";
import { Input, Link } from "../../components/UI";

const useStyles = makeStyles((theme) => ({
  left: {
    height: "100%",
    backgroundImage: `url("https://res.cloudinary.com/keentee/image/upload/v1606754779/Instee/posts/undefined/trm3uggwwkl7iadee9oz.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    position: "relative",
    boxSizing: "border-box",
    padding: "8% 10%",
    color: "#ffffff",

    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },

    "&:after": {
      content: `""`,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#111111",
      opacity: 0.5,
    },
  },

  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: theme.spacing(4),
    },
  },
  subtitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: theme.spacing(2.5),
    },
  },

  leftContent: {
    position: "relative",
    zIndex: 2,

    "&:last-child": {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  },

  content: {
    maxWidth: theme.spacing(88),
    padding: theme.spacing(2),
    margin: "auto",
    minHeight: "100vh",
    boxSizing: "border-box",

    [theme.breakpoints.down("md")]: {
      minHeight: "fit-content",
    },
  },

  button: {
    color: "#ffffff",
    backgroundColor: "#111111",
    width: "100%",
    height: theme.spacing(5),
    margin: theme.spacing(3, 0, 2),

    "&:hover": {
      backgroundColor: "#111111",
    },
  },
}));

function Join() {
  const classes = useStyles();
  const history = useHistory();

  const [fields, setFields] = useState({
    firstName: {
      label: "First name",
      name: "firstName",
      value: "",
      validated: true,
      default: "",
      validator: "",
      spacing: { xs: 12, md: 6 },
      type: "text",
    },
    lastName: {
      label: "Last name",
      name: "lastName",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12, md: 6 },
      type: "text",
    },
    email: {
      label: "Email address",
      name: "email",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12 },
      type: "email",
      validator: (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    },
    userName: {
      label: "Username",
      name: "userName",
      value: "",
      validated: true,
      default: "",
      description: "only letters, numbers, and underscores",
      spacing: { xs: 12 },
    },

    password: {
      label: "Password",
      name: "password",
      value: "",
      validated: true,
      default: "",
      type: "password",
      description: "min. 6 char",
      spacing: { xs: 12 },
      validator: (value) => value.length >= 6,
    },
  });

  const handleFieldChange = (event, field) => {
    const value = event.target.value;
    const validated = field.validator ? field.validator(value) : true;

    setFields((fields) => ({
      ...fields,
      [field.name]: { ...field, validated, value },
    }));
  };

  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const req = {};
      Object.values(fields).forEach((field) => (req[field.name] = field.value));

      const { data } = await api.requestSignUp(req);
      console.log(data);
      if (data.status === "success") history.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        <Box
          className={classes.left}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box className={classes.leftContent} mb={4}>
            <img
              src="https://unsplash.com/assets/core/logo-white-8962708214629a3e8f9fbf5b87b70c3ace41c4175cbcc267f7fbb8449ac45bdd.svg"
              alt="logo"
            />
          </Box>
          <Box className={classes.leftContent}>
            <Typography variant="h3" className={classes.title} gutterBottom>
              Creation starts&nbsp;here
            </Typography>
            <Typography variant="h5" className={classes.subtitle} gutterBottom>
              Access 2,388,048 free, high-resolution photos you can’t find
              anywhere else
            </Typography>
          </Box>
          <Box className={classes.leftContent}>
            <Typography variant="subtitle1">
              Uploaded 3 years ago by Khoa Tran
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box
          className={classes.content}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3" gutterBottom>
            Join Unsplash
          </Typography>
          <Box mb={5}>
            <Typography variant="body1">
              Already have an account?{" "}
              <Link variant="underlined" to="/login">
                Login
              </Link>
            </Typography>
          </Box>
          <form onSubmit={handleSignUp}>
            <Grid container spacing={2}>
              {Object.values(fields).map((field, index) => (
                <Grid item {...field.spacing} key={index}>
                  <Input
                    label={field.label}
                    id={field.name}
                    name={field.name}
                    description={field.description}
                    value={field.value}
                    validated={field.validated}
                    type={field.type}
                    onChange={(e) => handleFieldChange(e, field)}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              className={classes.button}
              disabled={
                !Object.values(fields).every(
                  (field) => field.value && field.validated
                )
              }
            >
              Join
            </Button>
          </form>
          <Typography variant="body1">
            By joining, you agree to the{" "}
            <Link variant="underlined" to="/terms">
              Terms
            </Link>{" "}
            and{" "}
            <Link variant="underlined" to="/privacy">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Join;
