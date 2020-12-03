import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box } from "@material-ui/core";
import { FavoriteOutlined, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { IconButton } from "./UI";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30rem",
    height: "60rem",
  },

  hover: {
    background:
      "linear-gradient(180deg,rgba(0,0,0,.34) 0,rgba(0,0,0,.338) 3.5%,rgba(0,0,0,.324) 7%,rgba(0,0,0,.306) 10.35%,rgba(0,0,0,.285) 13.85%,rgba(0,0,0,.262) 17.35%,rgba(0,0,0,.237) 20.85%,rgba(0,0,0,.213) 24.35%,rgba(0,0,0,.188) 27.85%,rgba(0,0,0,.165) 31.35%,rgba(0,0,0,.144) 34.85%,rgba(0,0,0,.126) 38.35%,rgba(0,0,0,.112) 41.85%,rgba(0,0,0,.103) 45.35%,rgba(0,0,0,.1) 48.85%,rgba(0,0,0,.103) 52.35%,rgba(0,0,0,.112) 55.85%,rgba(0,0,0,.126) 59.35%,rgba(0,0,0,.144) 62.85%,rgba(0,0,0,.165) 66.35%,rgba(0,0,0,.188) 69.85%,rgba(0,0,0,.213) 73.35%,rgba(0,0,0,.237) 76.85%,rgba(0,0,0,.262) 80.35%,rgba(0,0,0,.285) 83.85%,rgba(0,0,0,.306) 87.35%,rgba(0,0,0,.324) 90.85%,rgba(0,0,0,.338) 94.35%,rgba(0,0,0,.347) 97.85%,rgba(0,0,0,.35))",
  },
}));

function Card({ data: { likes, author, media, alt } = {} }) {
  const [liked, setLiked] = useState(false);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {/* <figure className={classes.imgContainer}>
        <img src={media.url} alt={alt} className={classes.img} />
      </figure> */}
      <Box className={classes.hover}>
        <Box p={2}>
          <Box display="flex" justifyContent="flex-end">
            <Box mr={1}>
              <IconButton>
                <FavoriteOutlined />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <Add />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
