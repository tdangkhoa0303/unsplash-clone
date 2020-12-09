import { useState, useCallback, Fragment } from "react";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import { Box, Typography, Grid } from "@material-ui/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Alert } from "@material-ui/lab";
import { PhotoLibrary, ArrowRight } from "@material-ui/icons";
import { UploadCard } from "../../components";
import { Modal, Link, CustomButton as Button } from "../../components/UI";
import Thanks from "../../assets/thank_you.svg";

import { createPhoto } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1, 0),

    [theme.breakpoints.down("md")]: {
      minHeight: "100%",
    },
  },

  submitTitle: {
    fontWeight: 500,
  },

  uploadArea: {
    borderStyle: "dashed",
    borderWidth: "2px",
    borderColor: "#d1d1d1",
    borderRadius: theme.spacing(0.5),
    height: "100%",
    boxSizing: "border-box",
  },

  browse: {
    color: blue[500],
    fontWeight: 500,
  },

  uploader: {
    maxWidth: theme.spacing(60),
    padding: theme.spacing(3),
    boxSizing: "border-box",
    cursor: "pointer",
    "& > svg": {
      width: theme.spacing(16),
      maxWidth: "40%",
      height: "auto",
      marginBottom: theme.spacing(2),
    },

    "& > h4": {
      [theme.breakpoints.down("lg")]: {
        fontSize: "1.5rem",
      },
    },
  },

  preview: {
    flex: 1,
  },

  seperator: {
    backgroundColor: "#d1d1d1",
  },

  submit: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "3rem",
    },
  },

  action: {
    [theme.breakpoints.down("md")]: {
      "& > *:not(:last-child)": {
        display: "none",
      },
    },
  },
}));

const acceptTypes = ["image/png", "image/jpeg"];

function PostPhoto({}) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const [data, setData] = useState({});
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState([]);

  const handleCancle = (event) => history.goBack();

  const handleFileChange = useCallback(
    (event) => {
      setError([]);
      const files = event.target.files;

      if (files) {
        for (let file of files) {
          if (Object.values(data).length >= 10) {
            setError((error) => [...error, "You can only upload 10 photos"]);
            break;
          }

          if (!acceptTypes.includes(file.type)) {
            setError((error) => [
              ...error,
              `[${file.name}]: We only accept PNG and JPEG`,
            ]);
            continue;
          }
          const id = v4();
          const url = URL.createObjectURL(file);
          const image = new Image();

          setData((data) => ({
            ...data,
            [id]: {
              id,
              photo: file,
              image: url,
              description: "",
              tag: "",
              location: {},
            },
          }));

          image.onload = function () {
            setData((data) => ({
              ...data,
              [id]: {
                ...data[id],
                height: this.height,
                width: this.width,
              },
            }));
          };

          image.src = url;
        }
      }
    },
    [data.length]
  );

  const handleFieldChange = (value, id, field) => {
    setData((data) => ({
      ...data,
      [id]: {
        ...data[id],
        [field]: value,
      },
    }));
  };

  const removePhoto = (id) =>
    setData((data) => {
      const res = {};
      for (let key of Object.keys(data)) {
        if (key !== id) res[key] = data[key];
      }
      return res;
    });

  const handleSubmit = async () => {
    const photos = Object.values(data);
    const request = photos.map((photo) => {
      const form = new FormData();
      for (let key of Object.keys(photo)) {
        form.append(key, photo[key]);
      }

      return createPhoto(form);
    });

    setUploading(true);
    try {
      const response = await Promise.all(request);
      setStep((step) => step + 1);
      setError([]);
    } catch (err) {
      setError([err.message]);
    } finally {
      setUploading(false);
    }
  };

  const getStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Fragment>
            <Box
              px={2}
              flexGrow={1}
              display="flex"
              flexDirection="column"
              my={1}
            >
              <Grid container spacing={2} className={classes.preview}>
                <Grid item xs={12}>
                  <Box
                    p={1}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    className={classes.uploadArea}
                  >
                    <Box
                      component="label"
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      alignItems="center"
                      htmlFor="photo"
                      className={classes.uploader}
                    >
                      {Object.values(data).length > 0 ? (
                        <Typography variant="h5">
                          Upload {10 - Object.values(data).length} photos more
                        </Typography>
                      ) : (
                        <Fragment>
                          <PhotoLibrary />
                          <Typography variant="h4" align="center">
                            Drag and drop up to 10 images or{" "}
                            <span className={classes.browse}>Browse</span> to
                            choose a file
                          </Typography>
                        </Fragment>
                      )}
                    </Box>
                    <input
                      type="file"
                      multiple
                      name="photo"
                      id="photo"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{
                      [theme.breakpoints.values["md"]]: 3,
                      [theme.breakpoints.values["xs"]]: 1,
                    }}
                  >
                    <Masonry gutter="10px">
                      {Object.values(data).map((upload) => (
                        <UploadCard
                          key={upload.id}
                          data={upload}
                          handleFieldChange={handleFieldChange}
                          removePhoto={removePhoto}
                        />
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </Grid>
              </Grid>
            </Box>

            <hr width="100%" className={classes.seperator}></hr>
            <Box
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className={classes.action}
            >
              <Box flexGrow={1}>
                <Typography variant="body2">
                  <Link to="/license"> Read the Unsplash License</Link>
                </Typography>
              </Box>
              <Box mr={1}>
                <Button variant="outlined" onClick={handleCancle}>
                  Cancle
                </Button>
              </Box>
              <Button
                variant="contained"
                color="dark"
                onClick={handleSubmit}
                disabled={!(Object.values(data).length > 0) || uploading}
                className={classes.submit}
              >
                Submit
                {data && Object.values(data).length > 0
                  ? ` ${Object.values(data).length} `
                  : " "}
                photo
              </Button>
            </Box>
          </Fragment>
        );
      case 2:
        return (
          <Box m={6}>
            <Box mb={4}>
              <Typography
                variant="h3"
                color="primary"
                align="center"
                gutterBottom
              >
                Congratulations!
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                All your photos have been added to our gallery
              </Typography>
              <Box display="flex" justifyContent="center">
                <Link to="/profile">
                  <Button variant="contained" color="dark" component="span">
                    Explore <ArrowRight />
                  </Button>
                </Link>
              </Box>
            </Box>

            <img alt="thank-you" src={Thanks} width="100%" />
          </Box>
        );
      default:
    }
  };

  return (
    <Modal visible={true} onClose={(e) => history.goBack()}>
      <Box className={classes.root} display="flex" flexDirection="column">
        <Box px={2}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.submitTitle}
          >
            Submit to Unsplash
          </Typography>

          {error &&
            error.map((e, i) => (
              <Grid item xs={12} key={i}>
                <Alert variant="outlined" color="error">
                  {e}
                </Alert>
              </Grid>
            ))}
        </Box>
        {getStep(step)}
      </Box>
    </Modal>
  );
}

export default PostPhoto;
