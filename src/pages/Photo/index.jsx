import { useState, useEffect, useContext, Fragment } from "react";
import { useHistory, useParams } from "react-router";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

import { Box, Typography, Avatar, Grid } from "@material-ui/core";

import { AuthorBox } from "../../components";
import {
  Modal,
  Link,
  CustomButton as Button,
  IconButton,
} from "../../components/UI";
import { FavoriteOutlined, Add, Room } from "@material-ui/icons";

import { getPhoto, reactPhoto } from "../../utils/api";
import Context from "../../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    background: "#ffffff",

    borderRadius: theme.spacing(1),
  },

  action: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",

      "& > div:last-child": {
        flexGrow: 1,
      },
    },
  },

  avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    marginRight: theme.spacing(1),
  },

  imageWrapper: {
    width: "100%",
    height: "80%",
    margin: 0,

    [theme.breakpoints.down("md")]: {
      height: "fit-content",
    },
  },

  img: {
    height: "100%",

    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "auto",
    },
  },

  fullName: {
    color: "#111111",
    cursor: "pointer",
    fontWeight: 500,
    lineHeight: 1,
  },
  liked: {
    color: red[400],
  },

  header: {
    position: "sticky",
    top: 0,
  },
}));

function Photo() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const {
    auth: { user },
  } = useContext(Context);

  const [photo, setPhoto] = useState({});

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState();
  const [liked, setLiked] = useState();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const { data } = await getPhoto(id);
        if (data.status === "success") {
          setPhoto((photo) => ({
            ...photo,
            ...data.data.photo,
          }));
          setFetching(false);
          setLiked(data.data.photo.likes.includes(user._id));
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPhoto();
  }, []);

  const handleReactPhoto = async (e, id) => {
    e.stopPropagation();
    try {
      setLiked((liked) => !liked);
      const { data } = await reactPhoto(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Modal visible={true} onClose={(e) => history.goBack()}>
      <Box className={classes.root}>
        {!fetching && (
          <Fragment>
            {" "}
            <Box
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid container spacing={2} className={classes.header}>
                <Grid item xs={12} md={6}>
                  <AuthorBox author={photo.author}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={photo.author.avatar && photo.author.avatar.url}
                        className={classes.avatar}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          className={classes.fullName}
                        >
                          {photo.author.fullName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          @{photo.author.userName}
                        </Typography>
                      </Box>
                    </Box>
                  </AuthorBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    className={classes.action}
                  >
                    <Box mr={1}>
                      <IconButton
                        onClick={(e) => handleReactPhoto(e, photo._id)}
                        variant="bordered"
                      >
                        <FavoriteOutlined
                          className={clsx(liked && classes.liked)}
                        />
                      </IconButton>
                    </Box>
                    <Box mr={1}>
                      <IconButton variant="bordered">
                        <Add />
                      </IconButton>
                    </Box>
                    <Box justifyContent="flex-end" display="flex">
                      <IconButton variant="bordered">Download</IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              className={classes.imageWrapper}
              display="flex"
              justifyContent="center"
            >
              <img
                src={photo.media.url}
                alt={photo.alt}
                className={classes.img}
              />
            </Box>
            {photo.location && (
              <Box p={2}>
                <Room />
                &nbsp;
                {photo.location.name}
              </Box>
            )}{" "}
          </Fragment>
        )}
      </Box>
    </Modal>
  );
}

export default Photo;
