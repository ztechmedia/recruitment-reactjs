import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { toIdr } from "../../utils/utility";

//material components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

export default function FeaturedPost(props) {
  const { job, userId, light } = props;
  let isApplyed = false;
  if (job.users) {
    isApplyed = job.users.map((usr) => usr._id).indexOf(userId) > -1;
  }
  const userJobIndex = job.users.map((user) => user._id).indexOf(userId);

  let message;

  if (userJobIndex > -1) {
    const Status = job.users[userJobIndex].status;
    if (Status === "Filtered")
      message = (
        <Fragment>
          <IconButton size="small">
            <CloseIcon color="error" />
          </IconButton>
          <Typography> Your Application Refused by Admin</Typography>
        </Fragment>
      );
    if (Status === "Accepted") {
      message = (
        <Fragment>
          <IconButton size="small">
            <CheckIcon color="primary" />
          </IconButton>
          <Typography> Your Application Accepted by Admin</Typography>
        </Fragment>
      );
    }
  }

  return (
    <Grid item md={4} sm={4} xs={12}>
      <Card
        style={
          isApplyed
            ? light
              ? { backgroundColor: "#f5f3e1" }
              : { backgroundColor: "#4a443a" }
            : null
        }
      >
        <CardActionArea component={Link} to={`/search-jobs/${job._id}`}>
          <CardContent>
            <Typography
              variant="h6"
              color={light ? "textSecondary" : "inherit"}
            >
              {job.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color={light ? "textSecondary" : "inherit"}
            >
              {toIdr(job.minSallary)} - {toIdr(job.maxSallary)}
            </Typography>
            <Typography
              variant="subtitle1"
              color={light ? "textSecondary" : "#ccc"}
            >
              {job.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {message ? (
            message
          ) : (
            <Fragment>
              <IconButton size="small">
                <DescriptionIcon />
              </IconButton>
              <Typography>
                {job.users.length > 0
                  ? isApplyed
                    ? "You Applyed, Waiting Response..."
                    : `${job.users.length} Applyed`
                  : "0 Applyed"}
              </Typography>
            </Fragment>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
