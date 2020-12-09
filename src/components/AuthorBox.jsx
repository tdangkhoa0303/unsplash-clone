import { makeStyles } from "@material-ui/core/styles";

import { Box, Avatar, Typography, Button, Grid } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { HoverBox } from "./UI";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },

  fullName: {
    marginBottom: theme.spacing(0),
    fontWeight: 600,
  },

  username: {
    color: "#767676",
    margin: 0,
  },

  hover: {
    maxWidth: theme.spacing(42),
    width: theme.spacing(42),
  },

  imageWrapper: {
    width: "100%",
    overflow: "hidden",
    height: theme.spacing(9),
    margin: 0,

    "& > img": {
      width: "100%",
      margin: 0,
    },
  },

  follow: {
    width: "100%",
    marginTop: theme.spacing(2),
    background: blue[500],
    color: "#ffffff",

    "&:hover": {
      background: blue[600],
    },
  },
}));

function AuthorBox({
  children,
  author: { userName, fullName, photos = [], avatar = {} },
}) {
  const classes = useStyles();

  return (
    <HoverBox
      content={
        <Box className={classes.hover}>
          <Box display="flex" mb={2}>
            <Avatar src={avatar.url} className={classes.avatar} />
            <Box ml={1}>
              <Typography variant="h6" className={classes.fullName}>
                {fullName}
              </Typography>
              <Typography
                variant="body2"
                className={classes.username}
              >{`@${userName}`}</Typography>
            </Box>
          </Box>
          <Box>
            <Grid container spacing={1}>
              {photos.map((photo) => (
                <Grid item key={photo.id} xs={4}>
                  <Box
                    component="figure"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    className={classes.imageWrapper}
                  >
                    <img src={photo.media.url} alt={photo.alt} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Button variant="contained" className={classes.follow}>
            Follow
          </Button>
        </Box>
      }
    >
      {children}
    </HoverBox>
  );
}

export default AuthorBox;
