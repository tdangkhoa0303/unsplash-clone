import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  Box,
  Button,
  useMediaQuery,
  Grid,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  MoreHoriz,
  Menu as MenuIcon,
  Twitter,
  Facebook,
  Instagram,
  Notifications,
} from "@material-ui/icons";

import { Link as RawLink } from "react-router-dom";
import { MenuItem, MenuList, Menu, Link } from "./UI/";

import Logo from "../assets/logo.svg";
import { Search } from "./";

import Context from "../Context";

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

const accountMenu = {
  mobile: [
    { title: "Notifications", url: "/?notifications=show" },
    { title: "View profile", url: "/profile" },
    { title: "Stats", url: "/stats" },
    { title: "Account settings", url: "/settings" },
  ],

  desktop: [
    { title: "View profile", url: "/profile" },
    { title: "Stats", url: "/stats" },
    { title: "Account settings", url: "/settings" },
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
    marginLeft: theme.spacing(4),

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
    flexWrap: "nowrap",

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
      fontSize: theme.spacing(1.5),
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
    minWidth: theme.spacing(25),
  },

  mbMenu: {
    padding: 0,

    "& > li": {
      paddingRight: 0,
    },
  },

  avatar: {
    height: theme.spacing(3.5),
    width: theme.spacing(3.5),

    "& > *": {
      width: "100%",
      height: "100%",
    },
  },

  rowReverse: {
    flexDirection: "row-reverse",
  },
}));

function Header() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();

  const data = md ? items.desktop : items.mobile;

  const {
    auth: { isAuth, user },
    setAuth,
  } = useContext(Context);

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
              component={RawLink}
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
            <Box mx={2} className={classes.grow}>
              <Search />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            className={clsx(!md && classes.rowReverse)}
          >
            <MenuList className={clsx(!md && classes.mbMenu)}>
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
                <Menu Trigger={md ? MoreHoriz : MenuIcon} anchor="right">
                  <Box component="ul" m={0} p={0} className={classes.menu}>
                    {data.map((item, i) => (
                      <MenuItem className={classes.menuItem} key={i}>
                        <Link variant="dark" to={item.url}>
                          {item.title}
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem className={classes.menuItem}>
                      <Box component="ul" m={0} p={0}>
                        <MenuItem
                          className={clsx(classes.menuItem, classes.social)}
                        >
                          <Link variant="dark" to="/">
                            <Twitter color="inherit" />
                          </Link>
                        </MenuItem>
                        <MenuItem
                          className={clsx(classes.menuItem, classes.social)}
                        >
                          <Link variant="dark" to="/">
                            <Facebook color="inherit" />
                          </Link>
                        </MenuItem>
                        <MenuItem
                          className={clsx(classes.menuItem, classes.social)}
                        >
                          <Link variant="dark" to="/">
                            <Instagram color="inherit" />
                          </Link>
                        </MenuItem>
                      </Box>
                    </MenuItem>
                    {!md && !isAuth && (
                      <Box px={2.5} py={1} color="#111111">
                        <Grid spacing={1} container>
                          <Grid item xs={6}>
                            <Button
                              component={RawLink}
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
                              component={RawLink}
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
                              component={RawLink}
                              to={{
                                pathname: "/submit",
                                state: { modal: true },
                              }}
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
                        <Link variant="dark" to="/">
                          Help
                        </Link>
                      </MenuItem>
                      <MenuItem className={classes.menuItem}>
                        <Link variant="dark" to="/">
                          License
                        </Link>
                      </MenuItem>
                      <MenuItem className={classes.menuItem}>
                        <Link variant="dark" to="/">
                          Press
                        </Link>
                      </MenuItem>
                      <MenuItem className={classes.menuItem}>
                        <Link variant="dark" to="/">
                          Join the team
                        </Link>
                      </MenuItem>
                    </Box>
                  </Box>
                </Menu>
              </MenuItem>
            </MenuList>
            {md && (
              <Box display="flex" alignItems="center">
                <Box mr={3}>
                  <Button
                    variant="outlined"
                    component={RawLink}
                    to={{ pathname: "/submit", state: { modal: true } }}
                  >
                    {lg ? "Submit a photo" : "Submit"}
                  </Button>
                </Box>
                {isAuth ? (
                  <Box mr={2}>
                    <IconButton>
                      <Notifications />
                    </IconButton>
                  </Box>
                ) : (
                  <Fragment>
                    <Button
                      component={RawLink}
                      to="login"
                      className={classes.withSeperator}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RawLink}
                      to="/join"
                    >
                      Join free
                    </Button>
                  </Fragment>
                )}
              </Box>
            )}
            {isAuth && (
              <Menu
                Trigger={(props) => (
                  <Box className={classes.avatar} {...props}>
                    <Avatar src={user.avatar && user.avatar.url} />
                  </Box>
                )}
                anchor="right"
              >
                <Box component="ul" m={0} p={0} className={classes.menu}>
                  {Object.values(
                    md ? accountMenu.desktop : accountMenu.mobile
                  ).map((item, i) => (
                    <MenuItem className={classes.menuItem} key={i}>
                      <Link variant="dark" to={item.url}>
                        {item.title}
                      </Link>
                    </MenuItem>
                  ))}
                  {!md && (
                    <Box px={2.5} py={1} color="#111111">
                      <Grid spacing={1} container>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.grow}
                          component={RawLink}
                          to={{ pathname: "/submit", state: { modal: true } }}
                        >
                          Submit a photo
                        </Button>
                      </Grid>
                    </Box>
                  )}
                  <hr />
                  <Box className={classes.menu} display="flex" p={0} m={0}>
                    <MenuItem className={classes.menuItem}>
                      <Link variant="dark" to="/">
                        Logout&nbsp;@{user.userName}
                      </Link>
                    </MenuItem>
                  </Box>
                </Box>
              </Menu>
            )}
          </Box>
        </Box>
      </header>
    </Fragment>
  );
}
export default Header;
