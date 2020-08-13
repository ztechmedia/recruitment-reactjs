import React from "react";

//material components
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Recruitment 2020
      </Link>
    </Typography>
  );
};

export default Copyright;
