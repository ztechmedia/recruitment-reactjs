import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const TableAction = (props) => {
  let actElement;

  const createLink = useCallback(
    (link) => {
      const url = link.to;
      const replace = link.replace;
      return url.replace(replace, props._id);
    },
    [props.link] // eslint-disable-line react-hooks/exhaustive-deps
  );

  switch (props.type) {
    case "link-icon":
      actElement = (
        <IconButton
          {...props.config}
          component={Link}
          to={createLink(props.link)}
        >
          {props.icon}
        </IconButton>
      );
      break;
    case "click-icon":
      actElement = (
        <IconButton
          {...props.config}
          onClick={() => props.click.clicked(props._id)}
        >
          {props.icon}
        </IconButton>
      );
      break;
    default:
      actElement = (
        <Button variant="outlined" color="primary" {...props.config}>
          {props.type} not found
        </Button>
      );
  }

  return actElement;
};

export default TableAction;
