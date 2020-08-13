import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as catActions from "../../../store/actions/categories";

//material components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Alerts from "../../../components/ui/Alerts";
import Table from "../../../components/ui/Table/Table";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
];

const Categories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const totalDoc = useSelector((state) => state.categories.totalDoc);
  const loading = useSelector((state) => state.categories.loading);

  const actions = [
    {
      type: "link-icon",
      icon: <EditIcon />,
      config: {
        size: "small",
      },
      link: {
        replace: ":id",
        to: "/master/categories/:id/edit",
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
        to="/master/categories/create"
      >
        Add Category
      </Button>
      <Paper className={classes.paper}>
        <Alerts />
        <Table
          title="Job Categories"
          rows={categories}
          totalDoc={totalDoc}
          loading={loading}
          headCells={headCells}
          defaultFilterKey="name"
          multipleDetele={true}
          onFetchTable={(query) => dispatch(catActions.fetchCategories(query))}
          onDeleteTable={(_id) => {
            dispatch(catActions.deleteCategories(_id));
          }}
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

export default Categories;
