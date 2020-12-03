import { useState, useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Box } from "@material-ui/core";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";
import { MenuItem } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    alignItems: "stretch",

    "&:before, &:after": {
      content: `" "`,
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      bottom: "0",
      width: theme.spacing(12),
      background: "linear-gradient(270deg,hsla(0,0%,100%,0) 0,#fff 95%,#fff)",
    },

    "&:after": {
      right: 0,
      left: "unset",
      background: "linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff 95%,#fff)",
    },
  },

  hideLeft: {
    "&:before, & > svg:first-child": {
      display: "none",
    },
  },

  hideRight: {
    "&:after, & > svg:last-child": {
      display: "none",
    },
  },

  overflow: {
    overflowX: "scroll",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    msOverflowStyle: "none",
    scrollbarWidth: 0,

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  list: {
    height: "100%",
  },

  controller: {
    cursor: "pointer",
    zIndex: 1,
    height: theme.spacing(2),
    color: "#767676",
    margin: "auto",
    position: "absolute",
    top: "calc(50% - 2px)",
    transform: "translateY(-50%)",
    left: theme.spacing(1),

    "&:last-child": {
      left: "unset",
      right: theme.spacing(2),
    },

    "&:hover": {
      color: "#111111",
    },
  },
}));

function ScrollMenu({ data, step = 2, render, className }) {
  let refs = [];
  const classes = useStyles();
  const container = useRef(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const updateBounding = () => {
    const {
      left: leftBound,
      right: rightBound,
    } = container.current.getBoundingClientRect();

    let lefted = false;
    let righted = false;

    for (let i = 0; i < data.length; i++) {
      const { left: itemLeft, right: itemRight } = refs[
        i
      ].getBoundingClientRect();
      if (!lefted && itemLeft > leftBound) {
        setLeft(i - 1 >= 0 ? i - 1 : 0);
        lefted = true;
      }

      if (itemRight >= rightBound) {
        setRight(i);
        righted = true;
        break;
      }
    }

    !righted && setRight(data.length - 1);
  };

  useLayoutEffect(() => {
    updateBounding();
  }, []);

  const handleScrollRight = () => {
    updateBounding();
    const index = right + step >= data.length ? data.length - 1 : right + step;
    scrollToItem(refs[index]);
  };

  const handleScrollLeft = () => {
    updateBounding();
    const index = left - step >= 0 ? left - step : 0;
    scrollToItem(refs[index]);
  };

  const scrollToItem = (item) =>
    item.scrollIntoView({
      behaviour: "smooth",
      block: "center",
      inline: "nearest",
    });

  return (
    <Box
      display="flex"
      alignItems="center"
      className={clsx(
        classes.root,
        className,
        left === 0 && classes.hideLeft,
        right === data.length - 1 && classes.hideRight
      )}
    >
      <ArrowBackIos className={classes.controller} onClick={handleScrollLeft} />
      <Box
        className={classes.overflow}
        ref={container}
        onScroll={updateBounding}
      >
        <Box component="ul" p={0} m={0} display="flex" className={classes.list}>
          {data.map((e, i) => (
            <MenuItem ref={(ref) => (refs[i] = ref)} key={e._id || i}>
              {render ? render(e) : e}
            </MenuItem>
          ))}
        </Box>
      </Box>
      <ArrowForwardIos
        className={classes.controller}
        onClick={handleScrollRight}
      />
    </Box>
  );
}

export default ScrollMenu;
