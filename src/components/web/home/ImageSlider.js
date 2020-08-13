import React from "react";
import { Link } from "react-router-dom";

//material components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//images
import Image from "../../../assets/images/karir.jpg";
// import ImageMobile from "../../assets/images/karir-mobile.jpg";

const ImageSlider = (props) => {
  const classes = useStyles();
  const { totalJobs } = props;

  return (
    <Paper className={classes.mainFeaturedPost}>
      <img
        style={{ position: "absolute", width: "100%", height: "100%" }}
        src={Image}
        alt="Slider"
      />
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <div className={classes.mainFeaturedPostContent}>
            <Paper className={classes.paper}>
              <Typography variant="h4" className={classes.jobCounter}>
                {totalJobs ? totalJobs : 0} Jobs Available
              </Typography>
              <Typography>
                Most Quality Jobs • Most Quality Employers • Most Trusted
              </Typography>
              <div className={classes.btnContainer}>
                <div className={classes.btn}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/register"
                  >
                    Free Sign Up
                  </Button>
                </div>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: 0,
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

export default ImageSlider;
