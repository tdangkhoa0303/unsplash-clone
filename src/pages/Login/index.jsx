import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { Input, CustomButton, Link } from "../../components/UI";

import Context from "../../Context";

import Logo from "../../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
  },

  logo: {
    height: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },

  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
  },

  loading: {
    position: "fixed",
    top: theme.spacing(-100),
    opacity: 0,
    padding: theme.spacing(2),
    width: "100%",
    transition: "all 0.2s ease-out",
  },

  loadingVisible: {
    opacity: 1,
    top: 0,
  },
}));

function Login() {
  const [fields, setFields] = useState({
    email: {
      label: "Email",
      name: "email",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12 },
      type: "email",
      validator: (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    },

    password: {
      label: "Password",
      name: "password",
      value: "",
      validated: true,
      default: "",
      type: "password",

      spacing: { xs: 12 },
    },
  });

  const { signIn } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const handleFieldChange = (event, field) => {
    const value = event.target.value;
    const validated = field.validator ? field.validator(value) : true;

    setFields((fields) => ({
      ...fields,
      [field.name]: { ...field, validated, value },
    }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    let req = {};
    Object.values(fields).forEach((field) => (req[field.name] = field.value));
    setLoading(true);
    const res = await signIn(req);
    console.log(res);
    setLoading(false);
  };

  return (
    <Container className={classes.root}>
      <Box
        className={clsx(classes.loading, loading && classes.loadingVisible)}
        display="flex"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
      <img src={Logo} alt="logo" className={classes.logo} />
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box mb={3}>
        <Typography variant="body1">Welcome back.</Typography>
      </Box>
      <form onSubmit={handleSubmitForm}>
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
          <Grid item xs={12}>
            <CustomButton
              color="dark"
              variant="contained"
              type="submit"
              className={classes.button}
            >
              Login
            </CustomButton>
          </Grid>
        </Grid>
      </form>
      <Box mt={2}>
        <Typography variant="body1">
          Don't have an account?{" "}
          <Link to="/join" variant="underlined">
            Join
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
