import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import clsx from "clsx";
import { red, green } from "@material-ui/core/colors";

import { reactPhoto } from "../utils/api";

import { Box, Avatar, Typography } from "@material-ui/core";
import { FavoriteOutlined, Add, ArrowDownward } from "@material-ui/icons";
import { IconButton } from "./UI";
import { AuthorBox } from "./";

import Context from "../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    cursor: "zoom-in",

    "&:hover .hover": {
      opacity: 1,
      zIndex: 2,
    },
  },

  hover: {
    opacity: 0,
    transition: "all 0.2s ease-out",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    background:
      "linear-gradient(180deg,rgba(0,0,0,.34) 0,rgba(0,0,0,.338) 3.5%,rgba(0,0,0,.324) 7%,rgba(0,0,0,.306) 10.35%,rgba(0,0,0,.285) 13.85%,rgba(0,0,0,.262) 17.35%,rgba(0,0,0,.237) 20.85%,rgba(0,0,0,.213) 24.35%,rgba(0,0,0,.188) 27.85%,rgba(0,0,0,.165) 31.35%,rgba(0,0,0,.144) 34.85%,rgba(0,0,0,.126) 38.35%,rgba(0,0,0,.112) 41.85%,rgba(0,0,0,.103) 45.35%,rgba(0,0,0,.1) 48.85%,rgba(0,0,0,.103) 52.35%,rgba(0,0,0,.112) 55.85%,rgba(0,0,0,.126) 59.35%,rgba(0,0,0,.144) 62.85%,rgba(0,0,0,.165) 66.35%,rgba(0,0,0,.188) 69.85%,rgba(0,0,0,.213) 73.35%,rgba(0,0,0,.237) 76.85%,rgba(0,0,0,.262) 80.35%,rgba(0,0,0,.285) 83.85%,rgba(0,0,0,.306) 87.35%,rgba(0,0,0,.324) 90.85%,rgba(0,0,0,.338) 94.35%,rgba(0,0,0,.347) 97.85%,rgba(0,0,0,.35))",
  },

  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    marginRight: theme.spacing(1),
  },

  imgContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    margin: 0,
  },

  img: {
    width: "100%",
  },

  fullName: {
    color: "#ffffff",
    opacity: 0.8,
    cursor: "pointer",
    fontWeight: 500,

    "&:hover": {
      opacity: 1,
    },
  },
  liked: {
    color: red[400],
  },
}));

function Card({ photo: { _id, id, likes = [], author, media, alt } = {} }) {
  const classes = useStyles();
  const {
    auth: { user },
    reactPhoto,
  } = useContext(Context);
  const history = useHistory();

  const handleReactPhoto = async (e, id) => {
    e.stopPropagation();
    reactPhoto(id);
  };

  return (
    <Box className={classes.root}>
      <Box
        component="figure"
        display="flex"
        alignItems="center"
        className={classes.imgContainer}
      >
        <img src={media.url} alt={alt} className={classes.img} />
      </Box>
      <Box
        className={clsx(classes.hover, "hover")}
        p={2.5}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        onClick={(e) =>
          history.push({
            pathname: `/photo/${_id}`,
            state: { modal: true },
          })
        }
      >
        <Box display="flex" justifyContent="flex-end">
          <Box mr={1}>
            <IconButton onClick={(e) => handleReactPhoto(e, _id)}>
              <FavoriteOutlined
                className={clsx(
                  user && likes.includes(user._id) && classes.liked
                )}
              />
            </IconButton>
          </Box>
          <Box>
            <IconButton>
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <AuthorBox author={author}>
            <Box display="flex" alignItems="center">
              <Avatar
                src={author.avatar && author.avatar.url}
                className={classes.avatar}
              />
              <Typography variant="subtitle1" className={classes.fullName}>
                {author.fullName}
              </Typography>
            </Box>
          </AuthorBox>
          <IconButton>
            <ArrowDownward />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
