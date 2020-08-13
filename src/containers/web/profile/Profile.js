import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";
import * as jobsActions from "../../../store/actions/jobs";
//material components
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SchoolIcon from "@material-ui/icons/School";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Header from "../../../components/web/navigation/Header";
import Image from "../../../assets/images/face.png";
import Background from "../../../assets/images/karir.jpg";
import Education from "../../../components/web/profile/education/Education";
import Experience from "../../../components/web/profile/experience/Experience";
import ProfileDetail from "../../../components/web/profile/profileDetail/ProfileDetail";

const PAPER_HEIGHT = window.innerHeight * 0.7;

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [offset, setOffset] = useState(0);
  const [tabActive, setTabActive] = useState("Educations");
  const totalJobs = useSelector((state) => state.jobs.totalDoc);
  const loading = useSelector((state) => state.jobs.loading);

  const headerLeft = [
    {
      linkTitle: "My Job",
      linkTo: "/my-job",
    },
  ];

  // useEffect(() => {
  //   window.onscroll = () => {
  //     setOffset(window.pageYOffset);
  //   };
  // }, []);

  const onFetchCountJob = useCallback(() => {
    dispatch(jobsActions.fetchCountJobs());
  }, [dispatch]);

  useEffect(() => {
    onFetchCountJob();
  }, [onFetchCountJob]);

  return (
    <Fragment>
      <div className={classes.toolbarHeader} />
      <Header headerLeft={headerLeft} />
      <Grid container>
        <Paper className={classes.slider}>
          <div className={classes.overlay}>
            <div className={classes.mainFeaturedPostContent}>
              <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.jobCounter}>
                  {!loading ? totalJobs : "Loading..."} Jobs Available
                </Typography>
                <Typography>
                  Most Quality Jobs • Most Quality Employers • Most Trusted
                </Typography>
                <div className={classes.btnContainer}>
                  <div className={classes.btn}>
                    <Button
                      size="small"
                      variant="outlined"
                      component={Link}
                      to="/search-jobs"
                    >
                      Search Jobs
                    </Button>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
          <Grid>
            <div className={classes.sliderContainer}>
              <div className={classes.imgSliderContainer}>
                <img
                  src={Image}
                  className={classes.imgSlider}
                  alt="imgSlider"
                />
              </div>
            </div>
          </Grid>
        </Paper>
        <Grid item md={12} sm={12} xs={12}>
          <Toolbar className={classes.toolbar}>
            <Button
              variant="contained"
              color={tabActive === "Educations" ? "secondary" : "default"}
              size="small"
              component={Link}
              to="/profile/education/list"
              startIcon={<SchoolIcon />}
            >
              Educations
            </Button>
            <Button
              variant="contained"
              color={tabActive === "Experiences" ? "secondary" : "default"}
              size="small"
              component={Link}
              to="/profile/experience/list"
              startIcon={<TimelapseIcon />}
            >
              Experiences
            </Button>
            <Button
              variant="contained"
              color={tabActive === "Profile" ? "secondary" : "default"}
              size="small"
              component={Link}
              to="/profile/detail/data"
              startIcon={<AssignmentIndIcon />}
            >
              Profile Detail
            </Button>
            <Button
              variant="contained"
              color={tabActive === "Account" ? "secondary" : "default"}
              size="small"
              startIcon={<AccountCircleIcon />}
            >
              Account
            </Button>
          </Toolbar>
        </Grid>
        <Grid item md={12} sm={12} xs={12} style={{ padding: 16 }}>
          <Route
            path="/profile/education"
            render={() => (
              <Education
                onSetTabActive={setTabActive}
                parentHeight={PAPER_HEIGHT}
              />
            )}
          />
          <Route
            path="/profile/experience"
            render={() => (
              <Experience
                onSetTabActive={setTabActive}
                parentHeight={PAPER_HEIGHT}
              />
            )}
          />
          <Route
            path="/profile/detail"
            render={() => (
              <ProfileDetail
                onSetTabActive={setTabActive}
                parentHeight={PAPER_HEIGHT}
              />
            )}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbarHeader: {
    ...theme.mixins.toolbar,
  },
  slider: {
    position: "relative",
    backgroundImage: `url(${Background})`,
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: PAPER_HEIGHT,
    borderRadius: 0,
  },
  sliderContainer: {
    padding: theme.spacing(2),
  },
  imgSliderContainer: {
    position: "absolute",
    width: PAPER_HEIGHT / 2,
    height: PAPER_HEIGHT / 2,
    borderRadius: "50%",
    overflow: "hidden",
    bottom: -(PAPER_HEIGHT / 2) * 0.5,
  },
  imgSlider: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 10,
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: "transparent",
    position: "absolute",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
    width: "100%",
    height: "100%",
  },
  mainFeaturedPostContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: window.innerHeight * 0.7,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  jobCounter: {
    fontWeight: "bold",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  btnContainerMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  btn: {
    marginLeft: 10,
    marginRight: 10,
    [theme.breakpoints.down(750)]: {
      marginTop: 5,
      marginBottom: 5,
    },
  },
}));

export default Profile;
