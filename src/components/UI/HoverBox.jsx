import { useState } from "react";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function HoverBox({
  content,
  top = 120,
  left = 0,
  bottom = 0,
  right = 0,
  children,
}) {
  const [hover, setHover] = useState({ visible: false, position: {} });

  const classes = makeStyles((theme) => ({
    root: {
      position: "relative",
    },

    hover: {
      position: "absolute",

      ...hover.position.hover,
    },

    content: {
      cursor: "pointer",
      padding: "1rem",
      backgroundColor: "#ffffff",
      borderRadius: "6px",
      border: "1px solid #d1d1d1",
      position: "relative",
      transition: "all 0.2s ease-out",

      "&:hover": {
        borderColor: "#767676",
      },

      "&:hover > div:first-child": {
        borderColor: "#767676 #767676 transparent transparent",
      },
    },

    triangle: {
      width: "8px",
      height: "8px",
      position: "absolute",
      backgroundColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "#d1d1d1 #d1d1d1 transparent transparent",
      transform: "translate(-50%, -50%) rotate(-45deg)",
      transition: "all 0.2s ease-out",
      ...hover.position.triangle,
    },
  }))();

  const position = {
    top: {
      hover: {
        top: 0,
        transform: "translateY(-100%)",
        paddingBottom: "1rem",
      },

      triangle: {
        top: "100%",
        transform: "translate(-50%, -50%) rotate(135deg)",
      },
    },
    bottom: {
      hover: {
        top: "100%",
        paddingTop: "1rem",
      },

      triangle: {
        top: 0,
      },
    },
    left: {
      hover: {
        left: "8px",
      },

      triangle: {
        left: "16px",
      },
    },
    right: {
      hover: { right: "8px" },

      triangle: {
        right: "16px",
      },
    },
  };

  let trigger;

  const handleMouseEnter = (event) => {
    const triggerRect = trigger.getBoundingClientRect();
    let x, y;

    if (
      triggerRect.top +
        triggerRect.bottom -
        top -
        window.innerHeight -
        2 * window.pageYOffset >
      0
    )
      x = position.top;
    else x = position.bottom;

    if (2 * triggerRect.left + triggerRect.width - window.innerWidth > 0)
      y = position.right;
    else y = position.left;

    setHover((hover) => ({
      ...hover,
      visible: true,
      position: {
        triangle: { ...x.triangle, ...y.triangle },
        hover: { ...x.hover, ...y.hover },
      },
    }));
  };

  const handleMouseLeave = (event) => {
    setHover((hover) => ({ ...hover, visible: false }));
  };

  return (
    <Box
      className={classes.root}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Box className={classes.hoverContainer} ref={(ref) => (trigger = ref)}>
        {children}
      </Box>
      {hover.visible && (
        <Box className={classes.hover}>
          <Box className={classes.content}>
            <div className={classes.triangle}></div>
            {content}{" "}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default HoverBox;
