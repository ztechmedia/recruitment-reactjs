/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../utils/history";
import { toIdr } from "../../utils/utility";
import * as jobsActions from "../../store/actions/jobs";
import * as themeActions from "../../store/actions/theme";
import * as modalActions from "../../store/actions/modal";
import * as usersActions from "../../store/actions/users";

//material components
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Paper from "@material-ui/core/Paper";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

const DetailJobs = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { match } = props;
  const [isApplyed, setIsApplyed] = useState(false);
  const [letApply, setLetApply] = useState(false);

  const light = useSelector((state) => state.layout.light);
  const isAuth = useSelector((state) => state.auth.token !== null);
  const job = useSelector((state) => state.jobs.job);
  const user = useSelector((state) => state.users.user);

  const onFetchMe = useCallback(() => {
    if (isAuth) dispatch(usersActions.fetchMe());
  }, [isAuth]);

  const onFetchJob = useCallback(() => {
    if (user !== null) dispatch(jobsActions.fetchJob(match.params.jobId));
  }, [user]);

  useEffect(() => {
    onFetchMe();
  }, [onFetchMe]);

  useEffect(() => {
    onFetchJob();
  }, [onFetchJob]);

  useEffect(() => {
    if (user !== null) {
      if (user.educations.length > 0 && user.experiences.length > 0)
        setLetApply(true);

      if (job !== null) {
        const userIndex = job.users
          .map((user) => user._id._id)
          .indexOf(user._id);
        if (userIndex > -1) setIsApplyed(true);
      }
    }
  }, [user, job]);

  const changeThemeHandler = () => {
    dispatch(themeActions.setTheme(!light));
  };

  const applyJobHandler = useCallback(() => {
    dispatch(jobsActions.applyJob(match.params.jobId));
    dispatch(modalActions.setModalContent(null));
    setIsApplyed(true);
  }, [dispatch, match.params.jobId]);

  const setModalHandler = () => {
    let modal = (
      <Fragment>
        <Typography variant="h6">Apply this job ?</Typography>
        <table>
          <tbody>
            <tr>
              <td>Job Name</td>
              <td>:</td>
              <td>{job ? job.name : null}</td>
            </tr>
            <tr>
              <td>Min Degree</td>
              <td>:</td>
              <td>{job ? job.minDegree : null}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>:</td>
              <td>{job ? job.description : null}</td>
            </tr>
          </tbody>
        </table>
        <div className={classes.btnContainer}>
          <Button
            disabled={isApplyed}
            variant="contained"
            color="primary"
            onClick={applyJobHandler}
          >
            {isApplyed ? "Already Applyed" : "Apply"}
          </Button>
        </div>
      </Fragment>
    );

    dispatch(modalActions.setModalContent(modal));
  };

  return (
    <Fragment>
      <Toolbar
        className={classes.toolbar}
        style={
          light ? { backgroundColor: "#fff" } : { backgroundColor: "#424242" }
        }
      >
        <IconButton
          variant="contained"
          color="inherit"
          size="medium"
          onClick={() => history.goBack()}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Button
          variant="outlined"
          size="medium"
          onClick={setModalHandler}
          disabled={isApplyed || !letApply}
        >
          {letApply
            ? "Apply This Job"
            : "Please add educations & experiences Min: 1 Each One "}
        </Button>
        <IconButton
          variant="contained"
          color="inherit"
          size="medium"
          onClick={changeThemeHandler}
        >
          {light ? <NightsStayIcon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
      <Grid container className={classes.gridContainer}>
        <Grid item md={6} sm={6} xs={12}>
          <Paper className={classes.paperTitle}>
            <Typography>Job Title</Typography>
            <Typography variant="h6">
              {job ? job.name : "Loading..."}
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Paper
            className={classes.paperTitle}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Typography>Min Degree</Typography>
              <Typography variant="h6">
                {job ? job.minDegree : "Loading..."}
              </Typography>
            </div>
            <div>
              <Typography>Sallary</Typography>
              <Typography>
                {job
                  ? `${toIdr(job.minSallary)} - ${toIdr(job.maxSallary)}`
                  : "Loading..."}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Paper
            className={classes.paperTitle}
            style={{ minHeight: window.innerHeight * 0.5 }}
          >
            <Typography variant="h5">
              <IconButton size="medium" color="inherit">
                <EditIcon />
              </IconButton>
              Job Descriptions
            </Typography>
            <Typography>{job ? job.description : "Loading..."}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: theme.spacing(1),
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridContainer: {
    padding: theme.spacing(2),
    "& > *": {
      padding: theme.spacing(1),
    },
  },
  paperTitle: {
    padding: theme.spacing(2),
  },
}));

export default DetailJobs;
