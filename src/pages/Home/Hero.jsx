import { Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "../../components/UI";
import { Container, Box, Typography, useMediaQuery } from "@material-ui/core";
import { Search } from "../../components";

const data = {
  id: "32f32f",
  media: {
    url:
      "https://res.cloudinary.com/keentee/image/upload/v1606754394/Instee/posts/undefined/xogasmlwdxij6jmxobal.jpg",
  },
  author: {
    fullName: "Khoa Tran",
  },
};

function Hero({ photo = data }) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  const classes = makeStyles((theme) => ({
    root: {
      color: "#ffffff",
      backgroundImage: `url("${photo.media.url}")`,
      backgroundPosition: "center bottom",
      backgroundSize: "cover",
      padding: theme.spacing(2),
    },

    main: {
      paddingTop: "15vh",
      paddingBottom: "15vh",
      maxWidth: theme.spacing(120),

      [theme.breakpoints.down("md")]: {
        paddingTop: "10vh",
        paddingBottom: "10vh",
      },
    },

    search: {
      margin: theme.spacing(2, 0, 2),
      borderRadius: theme.spacing(0.5),
      color: "#111111",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),

      "&:focus-within": {
        background: "#ffffff",
        boxShadow: "0 0 0 5px rgba(0, 0, 0, 0.2)",
      },
    },

    title: {
      [theme.breakpoints.down("md")]: {
        fontSize: "2rem",
      },
    },
  }))();
  return (
    <Box className={classes.root}>
      <Container className={classes.main}>
        <Typography className={classes.title} variant="h3" gutterBottom>
          Unsplash
        </Typography>
        <Box my={1}>
          <Typography variant="subtitle1">
            The internet’s source of &nbsp;
            <Link to="/" variant="underlined" color="dark">
              freely-usable images.
            </Link>
            <br />
            Powered by creators everywhere.
          </Typography>
        </Box>
        {md && (
          <Fragment>
            <Search className={classes.search} />
            <Typography variant="body2">
              Trending: flower, wallpapers, backgrounds, happy, love
            </Typography>
          </Fragment>
        )}
      </Container>

      <Box px={2}>
        <Typography variant="body2">
          <Link to="/" color="dark">
            Photo of the Day
          </Link>
          &nbsp;by&nbsp;
          <Link to="/" color="dark">
            {photo.author.fullName}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Hero;
