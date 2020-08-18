import React, { useCallback, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { toIdr } from "../../../utils/utility";
import { useSelector, useDispatch } from "react-redux";
import * as jobActions from "../../../store/actions/jobs";
import * as modalActions from "../../../store/actions/modal";

//material components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
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
import Pdf from "../../../assets/images/pdf.png";

const JobApplicants = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { match } = props;
  const job = useSelector((state) => state.jobs.job);

  const onFetchJob = useCallback(() => {
    dispatch(jobActions.fetchJob(match.params.jobId));
  }, [dispatch, match.params.jobId]);

  let applicants = <Spinner />;

  useEffect(() => {
    onFetchJob();
  }, [onFetchJob]);

  const onGiveApplicantStatus = (status, jobId, userId) => {
    dispatch(jobActions.jobStatus(status, jobId, userId));
    dispatch(modalActions.setModalContent(null));
  };

  const onReject = (job, user) => {
    let modal = (
      <Fragment>
        <h3>Give application status.</h3>
        <Typography variant="body2">
          Do you want to REFUCE/REJECT this application? please read for the
          qualification of job and compare it to applicant
        </Typography>
        {applicantStatus(job, user)}
        <div className={classes.btnContainer}>
          <Button
            color="secondary"
            onClick={() => onGiveApplicantStatus("Filtered", job._id, user._id)}
          >
            Refuse
          </Button>
        </div>
      </Fragment>
    );

    dispatch(modalActions.setModalContent(modal));
  };

  const onAccept = (job, user) => {
    let modal = (
      <Fragment>
        <h3>Give application status.</h3>
        <Typography variant="body2">
          Do you want to ACCEPT this application? please read for the
          qualification of job and compare it to applicant
        </Typography>
        {applicantStatus(job, user)}
        <div className={classes.btnContainer}>
          <Button
            color="primary"
            onClick={() => onGiveApplicantStatus("Accepted", job._id, user._id)}
          >
            Accept
          </Button>
        </div>
      </Fragment>
    );

    dispatch(modalActions.setModalContent(modal));
  };

  const applicantStatus = (job, user) => (
    <table>
      <tbody>
        <tr>
          <td>Job min degree</td>
          <td>:</td>
          <td>
            <Typography style={{ fontWeight: "bold" }}>
              {job.minDegree}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>Applicant degree</td>
          <td>:</td>
          <td>
            {user.educations.map((edu, i) => (
              <Typography key={i}>
                {edu.degree} - {edu.fieldofstudy}
              </Typography>
            ))}
          </td>
        </tr>
        <tr>
          <td>Applicant Experience</td>
          <td>:</td>
          <td>
            {user.experiences.map((exp, i) => (
              <Typography key={i}>
                {exp.title} - {exp.company} @{exp.location}
              </Typography>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );

  if (job) {
    applicants = (
      <List className={classes.listItems}>
        {job.users.map((user) => {
          let buttonAction;
          let textColor = null;

          if (user.status === "Applyed") {
            buttonAction = (
              <Fragment key={user._id._id}>
                <IconButton
                  size="small"
                  onClick={() => onReject(job, user._id)}
                >
                  <HighlightOffIcon color="error" />
                </IconButton>
                <Typography variant="subtitle1" color="error">
                  Refuse
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => onAccept(job, user._id)}
                >
                  <CheckCircleOutlineIcon color="primary" />
                </IconButton>
                <Typography variant="subtitle1">Accept</Typography>
              </Fragment>
            );
          } else if (user.status === "Filtered") {
            textColor = "pink";
            buttonAction = (
              <Fragment key={user._id._id}>
                <IconButton size="small">
                  <HighlightOffIcon color="error" />
                </IconButton>
                <Typography variant="subtitle1" color="error">
                  Refused
                </Typography>
              </Fragment>
            );
          } else if (user.status === "Accepted") {
            textColor = "green";
            buttonAction = (
              <Fragment key={user._id._id}>
                <IconButton size="small">
                  <CheckCircleOutlineIcon color="primary" />
                </IconButton>
                <Typography variant="subtitle1">Accepted</Typography>
              </Fragment>
            );
          }

          return (
            <React.Fragment key={user._id._id}>
              <ListItem
                alignItems="flex-start"
                style={textColor ? { color: textColor } : null}
              >
                <ListItemAvatar>
                  <Avatar alt="User Face" src={Image} />
                  {user._id.resume ? (
                    <a
                      href={`https://enigmatic-everglades-48569.herokuapp.com/files/${user._id.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Avatar alt="User Face" src={Pdf} />
                    </a>
                  ) : null}
                </ListItemAvatar>

                <div>
                  <ListItemText primary={user._id.name} />
                  <div>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                    >
                      Educations:
                    </Typography>

                    {user._id.educations &&
                      user._id.educations.map((edu, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                        >{`${edu.degree} - ${edu.fieldofstudy}`}</Typography>
                      ))}
                  </div>

                  <div>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                    >
                      Experiences:
                    </Typography>
                    {user._id.experiences &&
                      user._id.experiences.map((exp, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                        >{`${exp.title} - ${exp.company} @${exp.location}`}</Typography>
                      ))}
                  </div>
                </div>
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
                {buttonAction}
              </div>
            </React.Fragment>
          );
        })}
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
          <Typography variant="h6">{job ? job.name : null}</Typography>
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
            <Typography variant="h6">{job ? job.minDegree : null}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1">Sallary</Typography>
            <Typography variant="subtitle1">
              {job ? toIdr(job.minSallary) : null} -{" "}
              {job ? toIdr(job.maxSallary) : null}
            </Typography>
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
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default JobApplicants;
