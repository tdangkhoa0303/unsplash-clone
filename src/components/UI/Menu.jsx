import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Menu as MenuIcon } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import clsx from "clsx";

function Menu({ Trigger = MenuIcon, children, anchor = "right" }) {
  const container = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (container.current) {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [container]);

  let position;

  switch (anchor) {
    case "left":
      position = {
        general: {
          left: 0,
          transform: "scale(0)",
          transformOrigin: "top left",
        },

        visible: {
          transform: "scale(1)",
        },

        triangle: {
          left: "8px",
        },
      };
      break;
    case "right":
      position = {
        general: {
          right: 0,
          transform: "scale(0)",
          transformOrigin: "top right",
        },
        visible: {
          transform: "scale(1)",
        },

        triangle: {
          right: "8px",
        },
      };
      break;
    default:
      position = {
        general: {
          transform: "translateX(-50%) scale(0)",
          transformOrigin: "top center",
          left: "50%",
        },
        visible: {
          transform: "translateX(-50%) scale(1)",
        },

        triangle: {
          transform: "translateX(-50%)",
          left: "50%",
        },
      };
  }

  const classes = makeStyles((theme) => ({
    root: {
      position: "relative",
      display: "inline-block",
      zIndex: 3,
    },

    menu: {
      padding: theme.spacing(1, 0),
      position: "absolute",
      backgroundColor: "rgb(17, 17, 17)",
      boxShadow: "0 8px 16px rgba(0,0,0,.16)",
      transition: "0.3s all ease-in-out",
      opacity: 0,
      borderRadius: theme.spacing(0.5),
      minWidth: theme.spacing(20),
      top: "calc(100% + 16px)",
      zIndex: 3,

      ...position.general,
    },

    visible: {
      opacity: 1,
      ...position.visible,
    },

    triangle: {
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderColor: "transparent transparent rgb(17, 17, 17)",
      borderWidth: "0 5px 5px",
      position: "absolute",
      top: "-4px",
      ...position.triangle,
    },
  }))();

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target))
      setVisible(false);
  };

  return (
    <Box ref={container} className={classes.root}>
      <Trigger onClick={() => setVisible((visible) => !visible)} />

      <Box className={clsx(classes.menu, visible && classes.visible)}>
        <div className={classes.triangle}></div>
        {children}
      </Box>
    </Box>
  );
}

export default Menu;
