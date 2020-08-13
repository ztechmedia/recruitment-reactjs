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
import EducationList from "./EducationList";
import AddEducation from "./AddEducation";
import EditEducation from "./EditEducation";
import Alerts from "../../../ui/Alerts";

const Education = (props) => {
  const classes = useStyles();
  const { onSetTabActive } = props;
  const { parentHeight } = props;

  useEffect(() => {
    onSetTabActive("Educations");
  });

  return (
    <Paper
      className={classes.root}
      style={{ marginTop: (parentHeight / 2) * 0.5 }}
    >
      <div className={classes.title}>
        <Typography variant="h6">Education</Typography>
        <Button
          variant="outlined"
          size="small"
          color="default"
          component={Link}
          to="/profile/education/create"
          startIcon={<AddIcon />}
        >
          Add Education
        </Button>
      </div>

      <Divider />
      <div style={{ padding: 10 }}>
        <Alerts />
      </div>
      <Grid container className={classes.box}>
        <Route path="/profile/education/list" component={EducationList} />
        <Route path="/profile/education/create" component={AddEducation} />
        <Route
          path="/profile/education/:eduId/edit"
          component={EditEducation}
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

export default Education;
