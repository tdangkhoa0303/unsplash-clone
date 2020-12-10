import { Fragment, useContext, useState } from "react";

import {
  Container,
  Avatar,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ImageGrid } from "../../components/UI";
import { Card } from "../../components/";
import Context from "../../Context";

import { postAvatar } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  uploader: {
    display: "none",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#33333340",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },

  avatar: {
    height: theme.spacing(16),
    width: theme.spacing(16),
  },

  avatarContainer: {
    position: "relative",
    width: "fit-content",
    boxSizing: "border-box",
    marginRight: theme.spacing(4),
    overflow: "hidden",
    borderRadius: "50%",

    "&:hover > label": {
      display: "flex",
    },
  },
  grow: {
    flexGrow: 1,
  },

  nickName: {
    fontSize: theme.spacing(5),
  },
}));

function Profile() {
  const {
    auth: { user },
    setAuth,
  } = useContext(Context);

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(user.avatarUrl);

  const handleFileChange = async (event) => {
    const value = event.target.files[0];
    setLoading(true);
    const form = new FormData();
    form.append("avatar", value);
    const { data } = await postAvatar(form);

    if (data && data.success) setAvatar(URL.createObjectURL(value));
    setAuth((auth) => ({
      ...auth,
      user: { ...auth.user, avatar: data.data.avatar },
    }));
    setLoading(false);
  };

  return (
    <Fragment>
      {user && (
        <Container>
          <Box display="flex" my={4} alignItems="center">
            <Box className={classes.avatarContainer}>
              <Avatar
                src={user.avatar && user.avatar.url}
                alt="user avatar"
                className={classes.avatar}
              />
              <label
                htmlFor="avatar"
                className={classes.uploader}
                style={{
                  cursor: loading ? "progress" : "pointer",
                  pointerEvents: loading ? "none" : "all",
                }}
              >
                <IconButton color="inherit">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Box ml={3}>
              <Typography variant="h4">{user.fullName}</Typography>
              <Typography variant="subtitle1">@{user.userName}</Typography>
              <Typography variant="body1">{user.bio}</Typography>
            </Box>
          </Box>
          <ImageGrid>
            {user.photos.map((photo) => (
              <Card photo={photo} key={photo.id} />
            ))}
          </ImageGrid>
          <input
            type="file"
            name="avatar"
            id="avatar"
            hidden
            onChange={handleFileChange}
          />
        </Container>
      )}
    </Fragment>
  );
}

export default Profile;
