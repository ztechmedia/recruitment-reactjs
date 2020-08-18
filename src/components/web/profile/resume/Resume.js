import React, { useEffect } from "react";
import { Route, Link } from "react-router-dom";

//material components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Alerts from "../../../ui/Alerts";
import AddResume from "./AddResume";
import ResumeList from "./ResumeList";

const Resume = (props) => {
  const classes = useStyles();
  const { onSetTabActive } = props;
  const { parentHeight } = props;

  useEffect(() => {
    onSetTabActive("Resume");
  });

  return (
    <Paper
      className={classes.root}
      style={{ marginTop: (parentHeight / 2) * 0.5 }}
    >
      <div className={classes.title}>
        <Typography variant="h6">Resume</Typography>
        <Button
          variant="outlined"
          size="small"
          color="default"
          component={Link}
          to="/profile/resume/create"
          startIcon={<AddIcon />}
        >
          Add Resume
        </Button>
      </div>

      <Divider />
      <div style={{ padding: 10 }}>
        <Alerts />
      </div>
      <Grid container className={classes.box}>
        <Route exact path="/profile/resume/create" component={AddResume} />
        <Route exact path="/profile/resume/list" component={ResumeList} />
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    padding: 0,
  },
  title: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  box: {
    padding: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default Resume;
