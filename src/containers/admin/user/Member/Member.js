import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as usersActions from "../../../../store/actions/users";

//material components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Alerts from "../../../../components/ui/Alerts";
import Table from "../../../../components/ui/Table/Table";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  { id: "email", numeric: false, disablePadding: false, label: "E-Mail" },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
    middleware: (date) => moment(date).format("DD MMMM YYYY"),
  },
];

const Member = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const totalDoc = useSelector((state) => state.users.totalDoc);
  const loading = useSelector((state) => state.users.loading);

  const actions = [
    {
      type: "link-icon",
      icon: <EditIcon />,
      config: {
        size: "small",
      },
      link: {
        replace: ":id",
        to: "/master/members/:id/edit",
      },
    },
  ];

  return (
    <Grid item xs={12} sm={12}>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        component={Link}
        to="/master/members/create"
      >
        Add Member
      </Button>
      <Paper className={classes.paper}>
        <Alerts />
        <Table
          title="Members"
          rows={users}
          totalDoc={totalDoc}
          loading={loading}
          headCells={headCells}
          defaultFilterKey="name"
          multipleDetele={true}
          onFetchTable={(query) => dispatch(usersActions.fetchMembers(query))}
          onDeleteTable={(_id) => dispatch(usersActions.deleteUsers(_id))}
          actions={actions}
        />
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  formPaper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    borderColor: "white",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "100%",
  },
  formGrid: {
    padding: theme.spacing(2),
  },
  submit: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginBottom: 5,
  },
}));

export default Member;
