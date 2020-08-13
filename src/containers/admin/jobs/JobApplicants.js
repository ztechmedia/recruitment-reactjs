import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as jobActions from "../../../store/actions/jobs";

//material components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Spinner from "../../../components/ui/Spinner/Spinner";
import Image from "../../../assets/images/face.png";

const JobApplicants = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { match } = props;
  const job = useSelector((state) => state.jobs.job);

  const onFetchJob = useCallback(() => {
    dispatch(jobActions.fetchJob(match.params.jobId));
  }, [dispatch, match.params.jobId]);

  let applicants = <Spinner />;

  console.log(job);

  useEffect(() => {
    onFetchJob();
  }, [onFetchJob]);

  if (job) {
    applicants = (
      <List className={classes.listItems}>
        {job.users.map((user) => (
          <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="User Face" src={Image} />
              </ListItemAvatar>
              <ListItemText
                primary={user._id.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Educations:
                    </Typography>
                    {user._id.educations &&
                      user._id.educations.map((edu) => (
                        <React.Fragment>
                          <Typography variant="body2">{`${edu.degree} - ${edu.fieldofstudy}`}</Typography>
                        </React.Fragment>
                      ))}
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Experiences:
                    </Typography>
                    {user._id.experiences &&
                      user._id.experiences.map((exp) => (
                        <React.Fragment>
                          <Typography variant="body2">{`${exp.title} - ${exp.company} @${exp.location}`}</Typography>
                        </React.Fragment>
                      ))}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton size="small">
                <HighlightOffIcon color="error" />
              </IconButton>
              <Typography variant="subtitle1" color="error">
                Refuse
              </Typography>
              <IconButton size="small">
                <CheckCircleOutlineIcon color="primary" />
              </IconButton>
              <Typography variant="subtitle1">Accept</Typography>
            </div>
          </React.Fragment>
        ))}
      </List>
    );
  }

  return (
    <Grid container className={classes.root}>
      <Grid item md={12} sm={12} xs={12}>
        <IconButton size="medium" component={Link} to="/jobs/joblist">
          <ArrowBackIcon />
        </IconButton>
        Back to joblist
      </Grid>

      <Grid item md={6} sm={6} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="subtitle1">Job Name</Typography>
          <Typography variant="h6">IT Programmer</Typography>
        </Paper>
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <Paper
          className={classes.paper}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: " space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography variant="subtitle1">Min Degree</Typography>
            <Typography variant="h6">S1</Typography>
          </div>
          <div>
            <Typography variant="subtitle1">Sallary</Typography>
            <Typography variant="subtitle1">Rp8.000.000.00</Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Paper className={classes.paper}>{applicants}</Paper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      padding: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  listItems: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default JobApplicants;
