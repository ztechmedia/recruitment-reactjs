import React, { Fragment, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as jobActions from "../../store/actions/jobs";

//material components
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Header from "../../components/web/navigation/Header";
import Tabs from "../../components/Tabs";
import CardJob from "../../components/web/CardJob";
import Spinner from "../../components/ui/Spinner/Spinner";

const MyJob = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const light = useSelector((state) => state.layout.light);
  const jobs = useSelector((state) => state.jobs.jobs);
  const user = useSelector((state) => state.auth.userLogged);

  let jobApplyed = <Spinner />;
  let jobFiltered = <Spinner />;
  let jobAccepted = <Spinner />;

  if (jobs) {
    jobApplyed = [];
    jobFiltered = [];
    jobAccepted = [];

    jobs.map((job) => {
      job.users.map((usr) => {
        if (usr.status === "Applyed" && usr._id === user._id) {
          return jobApplyed.unshift(
            <CardJob job={job} userId={user._id} light={light} key={job._id} />
          );
        } else if (usr.status === "Filtered" && usr._id === user._id) {
          return jobFiltered.unshift(
            <CardJob job={job} userId={user._id} light={light} key={job._id} />
          );
        } else if (usr.status === "Accepted" && usr._id === user._id) {
          return jobAccepted.unshift(
            <CardJob job={job} userId={user._id} light={light} key={job._id} />
          );
        }
        return usr;
      });
      return job;
    });
  }

  if (jobApplyed.length === 0) {
    jobApplyed = <Typography>You dont have applyed job yet!</Typography>;
  }

  if (jobFiltered.length === 0) {
    jobFiltered = <Typography>You dont have filtered job yet!</Typography>;
  }

  if (jobAccepted.length === 0) {
    jobAccepted = <Typography>You dont have accepted job yet!</Typography>;
  }

  const onFetchJobs = useCallback(() => {
    dispatch(jobActions.fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    onFetchJobs();
  }, [onFetchJobs]);

  const tabsItem = [
    {
      label: `Job Applyed (${jobApplyed.length ? jobApplyed.length : 0})`,
      content: jobApplyed,
    },
    {
      label: `Job Refused (${jobFiltered.length ? jobFiltered.length : 0})`,
      content: jobFiltered,
    },
    {
      label: `Job Accepted (${jobAccepted.length ? jobAccepted.length : 0})`,
      content: jobAccepted,
    },
  ];

  const headerLeft = [
    {
      linkTitle: "Profile",
      linkTo: "/",
    },
  ];

  return (
    <Fragment>
      <div className={classes.toolbar} />
      <Header headerLeft={headerLeft} />
      <Tabs tabsItem={tabsItem} />
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    "& > *": {
      padding: theme.spacing(1),
    },
  },
}));

export default MyJob;
