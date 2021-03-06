import React from "react";
import { Link } from "react-router-dom";

//material components
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DescriptionIcon from "@material-ui/icons/Description";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

//utility
import { toIdr } from "../../utils/utility";

export default function CardJob(props) {
  const { job, onDelete, onStatusChange } = props;

  let active;

  if (job.status === "Active") {
    active = (
      <IconButton
        size="small"
        onClick={() => onStatusChange("Off", job._id, job.status)}
      >
        <CheckCircleIcon style={{ color: "green" }} />
        Active
      </IconButton>
    );
  } else {
    active = (
      <IconButton
        size="small"
        onClick={() => onStatusChange("Active", job._id, job.status)}
      >
        <CancelIcon style={{ color: "red" }} />
        Off
      </IconButton>
    );
  }

  return (
    <Grid item md={4} sm={4} xs={12} style={{ padding: 5 }}>
      <Card>
        <CardActionArea component={Link} to={`/jobs/joblist/${job._id}/edit`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {job.name}
            </Typography>
            <Typography variant="body2" component="p">
              {job.minDegree}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {toIdr(job.minSallary)} - {toIdr(job.maxSallary)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {job.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton
            size="small"
            component={Link}
            to={`/jobs/joblist/${job._id}/applicants`}
          >
            <DescriptionIcon />
            {job.users.length}
          </IconButton>
          <IconButton
            size="small"
            component={Link}
            to={`/jobs/joblist/${job._id}/edit`}
          >
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(job._id)}>
            <DeleteIcon />
          </IconButton>
          <Typography variant="body2">Session #{job.session}</Typography>
          {active}
        </CardActions>
      </Card>
    </Grid>
  );
}
