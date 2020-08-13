/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as jobsActions from "../../../store/actions/jobs";
import * as modalActions from "../../../store/actions/modal";

//material components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import CardJob from "../../../components/admin/CardJob";
import Spinner from "../../../components/ui/Spinner/Spinner";
import Alerts from "../../../components/ui/Alerts";

const Jobs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.jobs.loading);
  const jobs = useSelector((state) => state.jobs.jobs);
  const totalDoc = useSelector((state) => state.jobs.totalDoc);
  const pagination = useSelector((state) => state.jobs.pagination);

  const [limit, setLimit] = useState(24);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchJobs = useCallback(
    (query) => {
      dispatch(jobsActions.fetchJobs(query));
    },
    [dispatch]
  );

  const deleteJobHandler = (_id) => {
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
              dispatch(jobsActions.deleteJob(_id));
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

  const searchChangeHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (page !== 1) {
        setPage(1);
      } else {
        const query =
          search.length > 0
            ? `limit=${limit}&page=${page}&name[regex]=${search}`
            : `limit=${limit}&page=${page}`;
        fetchJobs(query);
      }
    },
    [search]
  );

  const pageChangeHandler = useCallback(() => {
    const query =
      search.length > 0
        ? `limit=${limit}&page=${page}&name[regex]=${search}`
        : `limit=${limit}&page=${page}`;
    fetchJobs(query);
  }, [limit, page]);

  const limitChangehandler = (e) => {
    setLimit(e.target.value);
  };

  const nextPageHandler = () => {
    if (pagination.next.page) {
      setPage(pagination.next.page);
    }
  };

  const prevPageHandler = () => {
    if (pagination.prev.page) {
      setPage(pagination.prev.page);
    }
  };

  useEffect(() => {
    fetchJobs(`limit=${limit}&page=${page}`);
  }, [fetchJobs]);

  useEffect(() => {
    pageChangeHandler();
  }, [pageChangeHandler]);

  let jobList = <Spinner />;
  let startIndex;
  let endIndex;

  if (!loading && jobs && jobs.length > 0) {
    startIndex = (page - 1) * limit + 1;
    if (startIndex === 0) startIndex = 0;
    endIndex = page * limit;
    if (endIndex > totalDoc) endIndex = totalDoc;
    jobList = jobs.map((job) => (
      <CardJob job={job} key={job._id} onDelete={deleteJobHandler} />
    ));
  }

  if (!loading && jobs && jobs.length === 0) {
    jobList = <Typography>Jobs is empty!</Typography>;
  }

  return (
    <Grid container>
      <Grid item md={12} sm={12} xs={12} className={classes.addContainer}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          component={Link}
          to="/jobs/joblist/create"
        >
          Add Job
        </Button>
      </Grid>
      <Grid item md={12} sm={12} xs={12} className={classes.searchContainer}>
        <div>
          <Typography variant="h6">Job List</Typography>
        </div>
        <div className={classes.searchControl}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Limit
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={limit}
              onChange={limitChangehandler}
              label="Limit"
            >
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={60}>60</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.search}>
            <form className={classes.form}>
              <InputBase
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Jobs"
                inputProps={{ "aria-label": "search jobs" }}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={(e) => searchChangeHandler(e)}
              >
                <SearchIcon />
              </IconButton>
            </form>
          </div>
        </div>
      </Grid>
      <Divider style={{ width: "100%", marginTop: 5, marginBottom: 5 }} />
      <Grid item md={12} sm={12} xs={12} className={classes.resultContainer}>
        <Typography variant="subtitle1">
          Show {startIndex} - {endIndex} from {totalDoc} Jobs
        </Typography>
        <Alerts />
        <div>
          <IconButton
            size="small"
            disabled={pagination && !pagination.prev}
            onClick={prevPageHandler}
          >
            <ArrowBackIcon />
          </IconButton>
          Page: {page}
          <IconButton
            size="small"
            disabled={pagination && !pagination.next}
            onClick={nextPageHandler}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </Grid>
      {jobList}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  search: {
    border: "1px solid #ccc",
    padding: 5,
    borderRadius: 10,
  },
  searchControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "& > *": {
      marginLeft: 5,
    },
  },
  jobsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  resultContainer: {
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(1),
  },
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  iconButton: {
    padding: 10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default Jobs;
