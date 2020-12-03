import { Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Box, Button, useMediaQuery, Grid } from "@material-ui/core";
import {
  MoreHoriz,
  Menu as MenuIcon,
  Twitter,
  Facebook,
  Instagram,
} from "@material-ui/icons";
import { Search } from "./";
import { Link } from "react-router-dom";
import { MenuItem, MenuList, Menu } from "./UI/";

import Logo from "../assets/logo.svg";
import clsx from "clsx";

const items = {
  mobile: [
    { title: "About", url: "/about" },
    { title: "Wallpapers", url: "/wallpapers" },
    { title: "Brands", url: "/brands" },
    { title: "Blog", url: "/blog" },
    { title: "Topics", url: "/topics" },
    { title: "Collections", url: "/collections" },
    { title: "Community", url: "/community" },
    { title: "Explore", url: "/explore" },
    { title: "History", url: "/history" },
    { title: "Made with Unsplash", url: "/made with unsplash" },
    { title: "API/Developers", url: "/api/developers" },
    { title: "Official Apps", url: "/official apps" },
  ],

  desktop: [
    { title: "About", url: "/about" },
    { title: "Wallpapers", url: "/wallpapers" },
    { title: "Blog", url: "/blog" },
    { title: "Topics", url: "/topics" },
    { title: "Collections", url: "/collections" },
    { title: "Community", url: "/community" },
    { title: "History", url: "/history" },
    { title: "Made with Unsplash", url: "/made with unsplash" },
    { title: "API/Developers", url: "/api/developers" },
    { title: "Official Apps", url: "/official apps" },
  ],
};

const useStyles = makeStyles((theme) => ({
  logo: {
    height: theme.spacing(4),
  },

  title: {
    marginLeft: theme.spacing(1.5),

    "& > span": {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1,
      whiteSpace: "nowrap",
    },

    "& > span:nth-child(2)": {
      fontSize: theme.spacing(1.5),
      marginTop: theme.spacing(0.5),
      fontWeight: 600,
    },

    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },

  root: {
    padding: theme.spacing(0, 2),
    height: theme.spacing(8),
    position: "sticky",
    background: "#ffffff",
    zIndex: 2,
    top: 0,
  },

  new: {
    background: "linear-gradient(94deg,#ff2a2a,#7074ff)",
    WebkitBackgroundClip: "text",
    WebkitBoxDecorationBreak: "clone",
    WebkitTextFillColor: "transparent",
    top: theme.spacing(-1),
    fontSize: theme.spacing(1),
    position: "relative",
  },

  grow: {
    flex: 1,
  },

  withSeperator: {
    position: "relative",
    marginRight: theme.spacing(2),

    "&:before": {
      position: "absolute",
      top: 0,
      left: theme.spacing(-2),
      width: "1px",
      height: theme.spacing(4),
      content: `""`,
      backgroundColor: "#d1d1d1",
    },
  },

  menuItem: {
    padding: theme.spacing(1, 2),
    color: "#ffffff",

    "&:hover": {
      color: "hsla(0,0%,100%,.6)",
    },
  },

  social: {
    "&:nth-child(1)": {
      paddingLeft: 0,
    },
  },

  menuFooter: {
    display: "flex",

    "& > li": {
      position: "relative",
      padding: theme.spacing(1),
    },

    "& > li:first-child": {
      padding: theme.spacing(1, 1, 1, 2),
    },

    "& > li:last-child": {
      padding: theme.spacing(1, 2, 1, 1),
    },

    "& > li:not(:first-child):before": {
      content: `""`,

      width: "3px",
      height: "3px",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      position: "absolute",
      top: "50%",
      left: 0,
      transform: "translate(-50%, -50%)",
    },
  },

  menu: {
    display: " block",
  },

  mbMenu: {
    [theme.breakpoints.down("md")]: {
      padding: 0,

      "& > li": {
        paddingRight: 0,
      },
    },
  },
}));

function Header() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();

  const data = md ? items.desktop : items.mobile;

  return (
    <Fragment>
      <header>
        <Box
          component="nav"
          display="flex"
          className={classes.root}
          alignItems="center"
        >
          <Box className={classes.grow} display="flex">
            <Box
              component={Link}
              to="/"
              color="inherit"
              display="flex"
              alignItems="center"
            >
              <img src={Logo} alt="unsplash logo" className={classes.logo} />
              <Box
                display="flex"
                alignItems="start"
                flexDirection="column"
                className={classes.title}
              >
                <span>Unsplash</span>
                <span>Photos for everyone</span>
              </Box>
            </Box>
            <Search />
          </Box>
          <MenuList className={classes.mbMenu}>
            {md && (
              <Fragment>
                <MenuItem>
                  <Link to="/brands">
                    Brands <span className={classes.new}>New</span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/explore">Explore</Link>
                </MenuItem>
              </Fragment>
            )}
            <MenuItem>
              <Menu
                Trigger={md ? MoreHoriz : MenuIcon}
                anchor={md ? "left" : "right"}
              >
                <Box component="ul" m={0} p={0} className={classes.menu}>
                  {data.map((item, i) => (
                    <MenuItem className={classes.menuItem} key={i}>
                      <Link to={item.url}>{item.title}</Link>
                    </MenuItem>
                  ))}
                  <MenuItem className={classes.menuItem}>
                    <Box component="ul" m={0} p={0}>
                      <MenuItem
                        className={clsx(classes.menuItem, classes.social)}
                      >
                        <Link to="/">
                          <Twitter color="inherit" />
                        </Link>
                      </MenuItem>
                      <MenuItem
                        className={clsx(classes.menuItem, classes.social)}
                      >
                        <Link to="/">
                          <Facebook color="inherit" />
                        </Link>
                      </MenuItem>
                      <MenuItem
                        className={clsx(classes.menuItem, classes.social)}
                      >
                        <Link to="/">
                          <Instagram color="inherit" />
                        </Link>
                      </MenuItem>
                    </Box>
                  </MenuItem>
                  {!md && (
                    <Box px={2.5} py={1} color="#111111">
                      <Grid spacing={1} container>
                        <Grid item xs={6}>
                          <Button
                            component={Link}
                            to="login"
                            variant="contained"
                            color="secondary"
                            className={classes.grow}
                          >
                            Login
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/join"
                            className={classes.grow}
                          >
                            Join free
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.grow}
                          >
                            Submit a photo
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  <hr />
                  <Box
                    component="ul"
                    m={0}
                    p={0}
                    className={classes.menuFooter}
                    display="flex"
                  >
                    <MenuItem className={classes.menuItem}>
                      <Link to="/">Help</Link>
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <Link to="/">License</Link>
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <Link to="/">Press</Link>
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <Link to="/">Join the team</Link>
                    </MenuItem>
                  </Box>
                </Box>
              </Menu>
            </MenuItem>
          </MenuList>
          {md && (
            <Box display="flex">
              <Box mr={6}>
                <Button variant="outlined">
                  {lg ? "Submit a photo" : "Submit"}
                </Button>
              </Box>
              <Button
                component={Link}
                to="login"
                className={classes.withSeperator}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/join"
              >
                Join free
              </Button>
            </Box>
          )}
        </Box>
      </header>
    </Fragment>
  );
}
export default Header;
