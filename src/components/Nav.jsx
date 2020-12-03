import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Box, useMediaQuery } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";

import { ScrollMenu, MenuItem } from "./UI/";

const categories = [
  { title: "Editorial", slug: "/editorial" },
  { title: "Wallpapers", slug: "/wallpapers" },
  { title: "Nature", slug: "/nature" },
  { title: "People", slug: "/people" },
  { title: "Architecture", slug: "/architecture" },
  { title: "Current Events", slug: "/current-events" },
  { title: "Experimental", slug: "/experimental" },
  { title: "Fashion", slug: "/fashion" },
  { title: "Film", slug: "/film" },
  { title: "Health & Wellness", slug: "/health-wellness" },
  { title: "Interiors", slug: "/interiors" },
  { title: "Street Photography", slug: "/street-photography" },
  { title: "Technology", slug: "/technology" },
  { title: "Travel", slug: "/travel" },
  { title: "Textures & Patterns", slug: "/textures-patterns" },
  { title: "Business & Work", slug: "/business-work" },
  { title: "Animals", slug: "/animals" },
  { title: "Food & Drink", slug: "/food-drink" },
  { title: "Athletics", slug: "/athletics" },
  { title: "Spirituality", slug: "/spirituality" },
  { title: "Arts & Culture", slug: "/arts-culture" },
  { title: "History", slug: "/history" },
];

const useStyles = makeStyles((theme) => ({
  root: { position: "sticky", top: theme.spacing(8), zIndex: 1 },

  boxShadow: {
    boxShadow: "0 4px 12px rgba(0,0,0,.08), 0 0 1px rgba(1,0,0,.1)",
    height: theme.spacing(7),
  },

  seperator: {
    width: "1px",
    backgroundColor: "#d1d1d1",
    margin: theme.spacing(1, 0),
  },

  navLink: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease-in-out",

    "&.active": {
      borderBottom: "2px solid #111",
    },
  },
}));

function Nav() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.boxShadow} display="flex">
        {matches && (
          <Box component="ul" px={1} m={0}>
            <MenuItem>
              <NavLink to="/editorial" className={classes.navLink}>
                Editorial
              </NavLink>
            </MenuItem>
          </Box>
        )}
        <Box className={classes.seperator} />
        <ScrollMenu
          data={matches ? categories.slice(1) : categories}
          render={(e) => (
            <NavLink to={e.slug} className={classes.navLink}>
              {e.title}
            </NavLink>
          )}
        />
        {matches && (
          <Box component="ul" px={1} m={0}>
            <MenuItem>
              <Link to="/">View all</Link>
            </MenuItem>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Nav;
