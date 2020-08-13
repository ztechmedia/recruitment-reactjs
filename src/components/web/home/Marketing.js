import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { title, description, image } = props;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className={classes.mContainer}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.imgContainer}>
          <img src={image} className={classes.img} alt={title} />
        </div>
        <div className={classes.mDescription}>
          <Typography>{description}</Typography>
        </div>
      </div>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
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
