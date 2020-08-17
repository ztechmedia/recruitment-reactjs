import React, { useState, useCallback, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { toIdr } from "../../../../utils/utility";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as hiresActions from "../../../../store/actions/hires";
import * as modalActions from "../../../../store/actions/modal";

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
import EmailIcon from "@material-ui/icons/Email";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Spinner from "../../../../components/ui/Spinner/Spinner";
import Image from "../../../../assets/images/face.png";

const HireDetail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { match } = props;
  const hire = useSelector((state) => state.hires.hire);
  const loading = useSelector((state) => state.hires.formSubmit);
  const [date, setDate] = useState(new Date());

  const onFetchHire = useCallback(() => {
    dispatch(hiresActions.fetchHire(match.params.hireId));
  }, [dispatch, match.params.hireId]);

  const changeDateHandler = (date) => {
    setDate(date);
  };

  let applicants = <Spinner />;

  useEffect(() => {
    onFetchHire();
  }, [onFetchHire]);

  const inviteHandler = (appId) => {
    let modal = (
      <Fragment>
        <h3>Invite user to interview?</h3>
        <Typography variant="body2">Interview Date:</Typography>
        <Typography variant="body2">
          {moment(date).format("D MMMM YYYY, hh:mm")}
        </Typography>
        <div className={classes.btnContainer}>
          <Button color="primary" onClick={() => onInviteInterview(appId)}>
            Send Email
          </Button>
        </div>
      </Fragment>
    );

    dispatch(modalActions.setModalContent(modal));
  };

  const onInviteInterview = (appId) => {
    dispatch(hiresActions.sendInvititation(hire._id, appId, date));
    dispatch(modalActions.setModalContent(null));
  };

  if (hire) {
    applicants = (
      <Grid container>
        <Grid item md={3} sm={12} xs={12}>
          <Typography variant="h6">Accepted Applicants</Typography>
          <Typography variant="body2">Invite them to the interview!</Typography>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container style={{ flexDirection: "column" }}>
              <KeyboardDatePicker
                disableToolbar
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose Interview Date"
                value={date}
                onChange={changeDateHandler}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Interview Time"
                value={date}
                onChange={changeDateHandler}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <Typography variant="h6" color="error">
            {loading ? "Sending email...." : null}
          </Typography>

          <List className={classes.listItems}>
            {hire.applicants.map((app) => {
              let buttonAction;

              if (app.status === "Accepted") {
                buttonAction = (
                  <Fragment key={app._id}>
                    <IconButton
                      size="small"
                      onClick={() => inviteHandler(app._id)}
                    >
                      <EmailIcon color="primary" />
                    </IconButton>
                    <Typography variant="subtitle1" color="primary">
                      Click to Invite
                    </Typography>
                  </Fragment>
                );
              } else {
                buttonAction = (
                  <Fragment key={app._id}>
                    <IconButton size="small">
                      <CheckCircleOutlineIcon color="secondary" />
                    </IconButton>
                    <Typography variant="subtitle1" color="secondary">
                      {app.status}
                    </Typography>
                  </Fragment>
                );
              }

              return (
                <React.Fragment key={app._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="User Face" src={Image} />
                    </ListItemAvatar>

                    <div>
                      <ListItemText primary={app.user.name} />
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                        >
                          Educations:
                        </Typography>

                        {app.user.educations &&
                          app.user.educations.map((edu, i) => (
                            <Typography key={i} variant="body2">
                              {edu}
                            </Typography>
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
                        {app.user.experiences &&
                          app.user.experiences.map((exp, i) => (
                            <Typography key={i} variant="body2">
                              {exp}
                            </Typography>
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
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className={classes.root}>
      <Grid item md={12} sm={12} xs={12}>
        <IconButton size="medium" component={Link} to="/jobs/hires">
          <ArrowBackIcon />
        </IconButton>
        Back to hires
      </Grid>

      <Grid item md={6} sm={6} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="subtitle1">Job Name</Typography>
          <Typography variant="h6">{hire ? hire.jobName : null}</Typography>
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
            <Typography variant="h6">{hire ? hire.minDegree : null}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1">Sallary</Typography>
            <Typography variant="subtitle1">
              {hire ? toIdr(hire.minSallary) : null} -{" "}
              {hire ? toIdr(hire.maxSallary) : null}
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

export default HireDetail;
