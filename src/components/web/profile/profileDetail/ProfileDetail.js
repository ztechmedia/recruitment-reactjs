import React, { useEffect, useCallback } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../../../store/actions/users";

//material components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import EditProfile from "./EditProfile";
import ProfileData from "./ProfileData";
import Alerts from "../../../../components/ui/Alerts";

const ProfileDetail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onSetTabActive } = props;
  const { parentHeight } = props;
  const user = useSelector((state) => state.users.user);

  const fetchMe = useCallback(() => {
    dispatch(userActions.fetchMe());
  }, [dispatch]);

  useEffect(() => {
    onSetTabActive("Profile");
    fetchMe();
  }, [fetchMe, onSetTabActive]);

  return (
    <Paper
      className={classes.root}
      style={{ marginTop: (parentHeight / 2) * 0.5 }}
    >
      <div className={classes.title}>
        <Typography variant="h6">Profile Detail</Typography>
        <Button
          variant="outlined"
          size="small"
          color="default"
          component={Link}
          to="/profile/detail/data/edit"
          startIcon={<EditIcon />}
        >
          Edit Profile
        </Button>
      </div>

      <Divider />

      <div style={{ padding: 10 }}>
        <Alerts />
      </div>

      <Box className={classes.box}>
        <Route
          exact
          path="/profile/detail/data"
          render={() => <ProfileData user={user} />}
        />
        <Route
          path="/profile/detail/data/edit"
          render={() => <EditProfile user={user} />}
        />
      </Box>
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

export default ProfileDetail;
