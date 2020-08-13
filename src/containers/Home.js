import React, { Fragment, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as jobsActions from "../store/actions/jobs";

//material components
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

//components
import Header from "../components/web/navigation/Header";
import ImageSlider from "../components/web/home/ImageSlider";
import Marketing from "../components/web/home/Marketing";

//images
import IdentitasImage from "../assets/images/identitas.png";
import ProfileImage from "../assets/images/profile.jpg";
import JobImage from "../assets/images/lowongan.jpg";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const totalJobs = useSelector((state) => state.jobs.totalDoc);

  const dataMarketing = [
    {
      title: "Professional Identity",
      description:
        "Build your professional identity online and stay connected with opportunities.",
      image: IdentitasImage,
    },
    {
      title: "Your Personal Page",
      description: "Log in to your personal page and view jobs that match you.",
      image: ProfileImage,
    },
    {
      title: "Richer Job Ads",
      description: "Get Salary Matching, Location Map and Company Insights.",
      image: JobImage,
    },
  ];

  const onFetchCountJob = useCallback(() => {
    dispatch(jobsActions.fetchCountJobs());
  }, [dispatch]);

  useEffect(() => {
    onFetchCountJob();
  }, [onFetchCountJob]);

  return (
    <Fragment>
      <div className={classes.toolbar} />
      <Header />
      <ImageSlider totalJobs={totalJobs} />
      <Grid container className={classes.content}>
        {dataMarketing.map((data, i) => (
          <Marketing
            key={i}
            title={data.title}
            description={data.description}
            image={data.image}
          />
        ))}
      </Grid>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    padding: 0,
  },
  marketing: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 50,
    [theme.breakpoints.down(900)]: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
  },
  content: {
    padding: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
  },
  mContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 350,
    padding: 16,
    [theme.breakpoints.down(900)]: {
      width: "100%",
    },
  },
  imgContainer: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    overflow: "hidden",
  },
  mDescription: {
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  img: {
    width: "100%",
    height: "auto",
  },
}));

export default Home;
