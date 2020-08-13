import React, { useCallback, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as usersActions from "../../../../store/actions/users";
import * as modalActions from "../../../../store/actions/modal";

//material components
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Spinner from "../../../ui/Spinner/Spinner";

export default function EducationList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const educations = useSelector((state) => state.users.educations);

  const setModalHandler = (_id) => {
    let modal = (
      <Fragment>
        <h3>Delete?</h3>
        <p>Are you sure want to delete?</p>
        <div className={classes.btnContainer}>
          <Button
            color="secondary"
            onClick={() => dispatch(modalActions.setModalContent(null))}
          >
            No
          </Button>
          <Button
            color="primary"
            onClick={() => {
              dispatch(usersActions.deleteEducation(_id));
              dispatch(modalActions.setModalContent(null));
            }}
          >
            Yes
          </Button>
        </div>
      </Fragment>
    );
    dispatch(modalActions.setModalContent(modal));
  };

  const fetchEducations = useCallback(() => {
    dispatch(usersActions.fetchEducations());
  }, [dispatch]);

  useEffect(() => {
    fetchEducations();
  }, [fetchEducations]);

  let list = <Spinner />;

  if (!loading && educations && educations.length > 0) {
    list = educations.map((edu) => (
      <Grid item md={3} sm={3} xs={12} key={edu._id}>
        <Card>
          <CardActionArea
            component={Link}
            to={`/profile/education/${edu._id}/edit`}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {edu.school}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {edu.degree}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {edu.fieldofstudy}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {edu.from} - {!edu.current ? edu.to : "now"}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {edu.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              color="default"
              onClick={() => setModalHandler(edu._id)}
            >
              DELETE
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  }

  if (!loading && educations && educations.length === 0) {
    list = <Typography>Educations still empty!</Typography>;
  }

  return list;
}

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
