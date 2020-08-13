import React from "react";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.Centered}>
      <div className={classes.Status}>404</div>
      <div className={classes.Description}>Page Not Found</div>
    </div>
  );
};

export default NotFound;
