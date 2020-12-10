import { useEffect, useRef, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useLocation } from "react-router";
import { Switch, Route } from "react-router-dom";

import { Home, Join, Login, PostPhoto, Photo } from "./pages";
import { AuthRoute, PublicRoute, PrivateFluid } from "./templates";
import { Provider } from "./Context";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#3cb46e",
      main: "#3cb46e",
      contrastText: "#ffffff",
    },

    secondary: {
      light: "#3cb46e",
      main: "#ffffff",
      contrastText: "#111111",
    },
  },

  typography: {
    button: {
      textTransform: "none",
      lineHeight: "30px",
      height: "2rem",
    },

    h3: {
      fontWeight: 700,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 768,
      lg: 1200,
      xl: 1920,
    },
  },

  overrides: {
    MuiButton: {
      root: {
        "&$disabled": {
          color: "#ffffff",
        },
      },
    },
  },
});

function App() {
  let previousLocation = useRef();
  const location = useLocation();

  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (!(location.state && location.state.modal)) {
      previousLocation.current = location;
    }
  }, []);

  useEffect(() => {
    setIsModal(
      location.state &&
        location.state.modal &&
        previousLocation.current !== location
    );
  }, [location]);

  return (
    <div className="App">
      <Provider>
        <ThemeProvider theme={theme}>
          <Route
            exact
            path="/submit"
            component={() => <PrivateFluid Component={PostPhoto} />}
          />
          <Route
            exact
            path="/photo/:id"
            component={() => <PrivateFluid Component={Photo} />}
          />
          <Switch location={isModal ? previousLocation.current : location}>
            <Route
              exact
              path="/"
              component={() => <PublicRoute Component={Home} />}
            />
            <Route
              exact
              path="/join"
              component={() => <AuthRoute Component={Join} />}
            />
            <Route
              exact
              path="/login"
              component={() => <AuthRoute Component={Login} />}
            />
          </Switch>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
