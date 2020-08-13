/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../utils/history";
import * as jobsActions from "../../store/actions/jobs";
import * as themeActions from "../../store/actions/theme";

//material components
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Spinner from "../../components/ui/Spinner/Spinner";
import CardJob from "../../components/web/CardJob";

const SearchJobs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const light = useSelector((state) => state.layout.light);
  const loading = useSelector((state) => state.jobs.loading);
  const jobs = useSelector((state) => state.jobs.jobs);
  const totalDoc = useSelector((state) => state.jobs.totalDoc);
  const pagination = useSelector((state) => state.jobs.pagination);
  const user = useSelector((state) => state.auth.userLogged);

  const [limit, setLimit] = useState(24);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const changeThemeHandler = () => {
    dispatch(themeActions.setTheme(!light));
  };

  const fetchJobs = useCallback(
    (query) => {
      dispatch(jobsActions.fetchJobs(query));
    },
    [dispatch]
  );

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
      <CardJob job={job} userId={user._id} light={light} key={job._id} />
    ));
  }

  if (!loading && jobs && jobs.length === 0) {
    jobList = <Typography>Jobs is empty!</Typography>;
  }

  return (
    <Fragment>
      <Toolbar
        className={classes.toolbar}
        style={
          light ? { backgroundColor: "#fff" } : { backgroundColor: "#424242" }
        }
      >
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
        <div>
          <IconButton
            variant="contained"
            color="inherit"
            size="medium"
            onClick={() => history.goBack()}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            variant="contained"
            color="inherit"
            size="medium"
            onClick={changeThemeHandler}
          >
            {light ? <NightsStayIcon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </Toolbar>
      <Grid container className={classes.content}>
        <Grid item md={12} sm={12} xs={12} className={classes.upperContainer}>
          <Typography variant="h6">
            {jobs ? jobs.length : 0} Jobs Found
          </Typography>

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
        <Divider style={{ width: "100%" }} />
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="subtitle1">
            Show {startIndex} - {endIndex} from {totalDoc} Jobs
          </Typography>
        </Grid>
        <Grid container className={classes.jobContianer}>
          {jobList}
        </Grid>
      </Grid>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  jobContianer: {
    minHeight: window.innerHeight * 0.5,
    "& > *": {
      padding: theme.spacing(1),
    },
  },
  upperContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    padding: theme.spacing(2),
  },
  toolbar: {
    padding: theme.spacing(1),
    justifyContent: "space-between",
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
  search: {
    border: "1px solid #ccc",
    padding: 5,
    borderRadius: 10,
  },
  iconButton: {
    padding: 10,
  },
}));

export default SearchJobs;
