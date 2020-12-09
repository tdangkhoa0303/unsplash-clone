import { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";

import { Box, IconButton } from "@material-ui/core";
import { LocationOn as Location, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "auto",
  },

  field: {
    padding: theme.spacing(1.5, 2),
    fontSize: "1rem",
    width: "100%",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
    resize: "none",
    border: "1px solid #d1d1d1",
    transition: "border-color .1s ease-in-out",
    borderTop: "none",
    lineHeight: "1.5rem",
    zIndex: 2,

    "&:focus": {
      borderColor: "#767676",
    },
  },

  textarea: {
    borderTop: "1px solid transparent",
    transform: "translateY(-1px)",
    zIndex: 1,

    "&:focus": {
      borderColor: "#767676",
      zIndex: 2,
    },
  },

  imageWrapper: {
    position: "relative",
    display: "flex",
  },

  overlay: {
    content: `""`,
    position: "absolute",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0) 85%, rgba(0,0,0,0.3) 100%);",
    top: 0,
    left: 0,
  },

  location: {
    position: "relative",
    color: "#ffffff",
    background: "rgba(0, 0, 0, 0.6)",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0, 1),
    transition: "all 0.2s ease-out",

    "& > input": {
      backgroundColor: "transparent",
      outline: "none",
      border: "none",
      fontSize: "1rem",
      color: "#ffffff",
      width: "100%",
      minWidth: "fit-content",
      lineHeight: "32px",
    },

    "& > input:focus": {
      color: "#111111",
    },

    "&:focus-within": {
      backgroundColor: "#ffffff",
      width: "100%",
      borderRadius: theme.spacing(0.5),
    },

    "&:focus-within > svg": {
      color: "#d1d1d1",
    },
  },

  suggestions: {
    listStyle: "none",
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    margin: 0,
    padding: theme.spacing(1, 0),
    border: "1px solid #d1d1d1",
    color: "#333333",
    maxHeight: "160px",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    zIndex: 3,
    width: "100%",
    borderRadius: "2px",
    boxShadow: "0px 4px 16px rgba(50, 50, 50, 0.2)",
    boxSizing: "border-box",

    "& > li": {
      lineHeight: "24px",
      padding: theme.spacing(1),
      cursor: "pointer",

      "&:hover": {
        backgroundColor: "#eeeeee",
      },
    },
  },

  marker: {
    transform: "translateY(-1px)",
    height: "16px",
  },

  remove: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: "#ffffff",
    zIndex: 3,
  },
}));

const GEOCODING_URL = process.env.REACT_APP_GEOCODING_URL;

function UploadCard({ data, handleFieldChange, removePhoto }) {
  const classes = useStyles();
  const [locations, setLocations] = useState({
    fetching: false,
    data: [],
  });

  const [visible, setVisible] = useState(false);

  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      const form = formRef.current;
      const handleClickOutside = (e) => {
        if (!form.contains(e.target)) setVisible(false);
      };

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [formRef.current]);

  const suggestLocation = async (event) => {
    const value = event.target.value;
    const fetchUrl = `${GEOCODING_URL}/mapbox.places/${value}.json`;

    try {
      setLocations((locations) => ({
        ...locations,
        fetching: true,
      }));
      const { data } = await axios.get(fetchUrl, {
        params: {
          type: "region",
          access_token: process.env.REACT_APP_MAPBOX_API_KEY,
          country: "vn",
          autocomplete: true,
        },
      });
      console.log(data);
      const options = data.features.map((e) => ({
        id: e.id,
        name: e.place_name,
        center: e.center,
      }));

      setLocations((locations) => ({
        ...locations,
        fetching: false,
        data: options,
      }));
    } catch (err) {
      console.log("Something went wrong :(");
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box className={classes.imageWrapper}>
        <img className={classes.image} src={data.image} alt="upload" />
        <IconButton
          className={classes.remove}
          onClick={() => removePhoto(data.id)}
        >
          <Close color="inherit" />
        </IconButton>
        <Box
          className={classes.overlay}
          p={1}
          display="flex"
          alignItems="flex-end"
        >
          <Box
            className={classes.location}
            autoComplete="off"
            component="form"
            display="flex"
            alignItems="center"
            ref={formRef}
          >
            <Location className={classes.marker} />
            <input
              name="location"
              value={data.location && data.location.name}
              placeholder="Add a location"
              onChange={suggestLocation}
              onFocus={() => setVisible(true)}
            />
            {visible && locations.data.length > 0 && (
              <ul className={classes.suggestions}>
                {locations.data.map((e, i) => (
                  <li
                    key={e.id}
                    onClick={() => {
                      handleFieldChange(e, data.id, "location");
                      setVisible(false);
                    }}
                  >
                    {e.name}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        </Box>
      </Box>
      <input
        name="tag"
        value={data.value}
        placeholder="Add a tag"
        onChange={(e) => handleFieldChange(e.target.value, data.id, "tag")}
        className={classes.field}
      />
      <textarea
        name="description"
        value={data.value}
        placeholder="Add a description"
        onChange={(e) =>
          handleFieldChange(e.target.value, data.id, "description")
        }
        className={clsx(classes.field, classes.textarea)}
        rows={3}
      />
    </Box>
  );
}
export default UploadCard;
