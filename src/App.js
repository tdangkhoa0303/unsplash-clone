import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Nav, Card } from "./components";

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
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1200,
      xl: 1920,
    },
  },
});

function App() {
  return (
    <div className="App">
      <Provider>
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <Nav />
            <Card />
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
