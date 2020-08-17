import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as hiresActions from "../../../../store/actions/hires";

//material components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Alerts from "../../../../components/ui/Alerts";
import Table from "../../../../components/ui/Table/Table";

const headCells = [
  {
    id: "jobName",
    numeric: false,
    disablePadding: true,
    label: "Job Name",
  },
  {
    id: "session",
    numeric: false,
    disablePadding: true,
    label: "Session",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: true,
    label: "Category",
  },
  {
    id: "totalApplicants",
    numeric: false,
    disablePadding: true,
    label: "Total App",
  },
  {
    id: "acceptedApplicants",
    numeric: false,
    disablePadding: true,
    label: "Accepted",
  },
  {
    id: "rejectedApplicants",
    numeric: false,
    disablePadding: true,
    label: "Accepted",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
];

const Hires = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const hires = useSelector((state) => state.hires.hires);
  const totalDoc = useSelector((state) => state.hires.totalDoc);
  const loading = useSelector((state) => state.hires.loading);

  const actions = [
    {
      type: "link-icon",
      icon: <VisibilityIcon />,
      config: {
        size: "small",
      },
      link: {
        replace: ":id",
        to: "/jobs/hires/:id/detail",
      },
    },
  ];

  return (
    <Grid item xs={12} sm={12}>
      <Paper className={classes.paper}>
        <Alerts />
        <Table
          title="Hires of Jobs"
          rows={hires}
          totalDoc={totalDoc}
          loading={loading}
          headCells={headCells}
          defaultFilterKey="jobName"
          multipleDetele={true}
          onFetchTable={(query) => dispatch(hiresActions.fetchHires(query))}
          onDeleteTable={(_id) => {
            dispatch(hiresActions.deleteHires(_id));
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

export default Hires;
