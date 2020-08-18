import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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

const Admin = () => {
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
        to: "/master/admin/:id/edit",
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
        to="/master/admin/create"
      >
        Add User
      </Button>
      <Paper className={classes.paper}>
        <Alerts />
        <Table
          title="Users Admin"
          totalDoc={totalDoc}
          rows={users}
          loading={loading}
          headCells={headCells}
          defaultFilterKey="name"
          multipleDetele={true}
          onFetchTable={(query) => dispatch(usersActions.fetchUsers(query))}
          onDeleteTable={(_id) => dispatch(usersActions.deleteUsers(_id))}
          actions={actions}
        />
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  button: {
    marginBottom: 5,
  },
}));

export default Admin;
