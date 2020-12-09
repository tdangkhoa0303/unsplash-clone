import { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";

import { Box, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#33333399",
    opacity: 0,
    minHeight: "100vh",
    height: "100%",
    overflowY: "auto",
    display: "none",
    top: 0,
    left: 0,
    zIndex: 3,
    position: "fixed",
    transition: "all 0.2s ease-in",
    width: "100%",
    padding: "5% 8%",
    boxSizing: "border-box",

    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },

  visible: {
    opacity: 1,
    display: "flex",
  },

  content: {
    width: "100%",
    minHeight: "100%",
    [theme.breakpoints.down("md")]: {
      minHeight: "100%",
      height: "auto",
    },
  },

  close: {
    position: "fixed",
    top: theme.spacing(1),
    left: theme.spacing(1),
    color: "#ffffff",
    zIndex: 5,

    [theme.breakpoints.down("md")]: {
      left: "unset",
      right: theme.spacing(1),
      color: "#111111",
    },
  },
}));

function Modal({ children, className, onClose, visible = true, ...props }) {
  const classes = useStyles();
  const content = useRef();

  useEffect(() => {
    disableBodyScroll(document.body);

    return () => {
      enableBodyScroll(document.body);
    };
  }, []);

  const handleClickOutside = (event) => {
    onClose();
  };

  const handleClickOnModal = (event) => event.stopPropagation();

  return (
    <Box
      className={clsx(classes.root, visible && classes.visible, className)}
      onClick={handleClickOutside}
      ref={content}
      {...props}
    >
      <IconButton onClick={onClose} className={classes.close}>
        <Close color="inherit" />
      </IconButton>
      <Box className={classes.content} onClick={handleClickOnModal}>
        {children}
      </Box>
    </Box>
  );
}

export default Modal;
