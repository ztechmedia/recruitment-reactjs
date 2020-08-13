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
import ExperienceList from "./ExperienceList";
import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";
import Alerts from "../../../ui/Alerts";

const Experience = (props) => {
  const classes = useStyles();
  const { onSetTabActive } = props;
  const { parentHeight } = props;

  useEffect(() => {
    onSetTabActive("Experiences");
  });

  return (
    <Paper
      className={classes.root}
      style={{ marginTop: (parentHeight / 2) * 0.5 }}
    >
      <div className={classes.title}>
        <Typography variant="h6">Experience</Typography>
        <Button
          variant="outlined"
          size="small"
          color="default"
          component={Link}
          to="/profile/experience/create"
          startIcon={<AddIcon />}
        >
          Add Experience
        </Button>
      </div>

      <Divider />
      <div style={{ padding: 10 }}>
        <Alerts />
      </div>
      <Grid container className={classes.box}>
        <Route path="/profile/experience/list" component={ExperienceList} />
        <Route path="/profile/experience/create" component={AddExperience} />
        <Route
          path="/profile/experience/:expId/edit"
          component={EditExperience}
        />
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

export default Experience;
