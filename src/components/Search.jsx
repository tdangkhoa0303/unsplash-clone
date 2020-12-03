import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  InputBase,
  Box,
  Button,
  List,
  ListItem,
  useMediaQuery,
} from "@material-ui/core";
import { Search as SearchIcon, Close } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},

  grow: { flex: 1 },

  searchContainer: {
    width: "100%",
    fontSize: "1rem",
    background: "#eeeeee",
    position: "relative",
    borderRadius: theme.spacing(3),
    height: theme.spacing(5),
    border: "1px solid transparent",
    transition: "all .1s ease-in-out",

    "&:focus-within": {
      borderColor: "#d1d1d1",
      backgroundColor: "transparent",
    },

    "&:focus-within > ul": {
      opacity: 1,
      display: "block",
    },
  },

  search: {
    width: "100%",

    "& > input": {
      padding: "1px 2px 2px 10px",
      lineHeight: "2.5rem",
      height: "unset",
    },
  },

  button: {
    padding: theme.spacing(0, 2),
    minWidth: 0,
    color: "#767676",
    height: "1rem",
    cursor: "pointer",

    "&:nth-child(1)": {
      paddingRight: 0,
    },

    "&:hover": {
      color: "#111111",
    },
  },

  list: {
    padding: theme.spacing(1, 0),
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    left: 0,
    display: "none",
    opacity: 0,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.12)",
    border: "1px solid #d1d1d1",
    borderRadius: theme.spacing(0.5),
    transition: "all 0.1s ease-in-out",
    backgroundColor: "#ffffff",
  },

  listItem: {
    cursor: "pointer",
    "&:hover": {
      background: "#eeeeee",
    },
  },
}));

function Search() {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const [data, setData] = useState(["sads", "adsdas", "assad"]);

  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleClearing = (event) => {
    setSearch("");
  };

  return (
    <Box ml={2} className={classes.grow}>
      <Box
        component="form"
        display="flex"
        autoComplete="off"
        className={classes.searchContainer}
        alignItems="center"
      >
        <Button type="submit" className={classes.button}>
          <SearchIcon />
        </Button>
        <InputBase
          placeholder={
            lg ? "Search free high-resolution photos" : "Search photos"
          }
          className={classes.search}
          value={search}
          onChange={handleSearchChange}
        />
        {search && (
          <Close className={classes.button} onClick={handleClearing} />
        )}

        {data && search && (
          <List className={clsx(classes.list)}>
            {data.map((suggest, i) => (
              <ListItem
                key={i}
                className={classes.listItem}
                component={Link}
                to="/"
              >
                {suggest}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default Search;
