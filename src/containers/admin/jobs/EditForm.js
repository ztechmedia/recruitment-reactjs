/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  inputChangeHandler,
  setFormValue,
  optionsChange,
} from "../../../utils/utility";
import * as jobsActions from "../../../store/actions/jobs";
import * as catActions from "../../../store/actions/categories";

//material components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import Alerts from "../../../components/ui/Alerts";
import InputGenerator from "../../../components/ui/InputGenerator";
import Spinner from "../../../components/ui/Spinner/Spinner";

const EditForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { match } = props;
  const loading = useSelector((state) => state.jobs.loading);
  const categories = useSelector((state) => state.categories.categories);
  const job = useSelector((state) => state.jobs.job);

  const [form, setForm] = useState({
    name: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Job Name",
        autoFocus: true,
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    categories: {
      elementType: "select-fetch",
      elementConfig: {
        variant: "outlined",
        label: "Job Categories",
        options: [],
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    minSallary: {
      elementConfig: {
        type: "number",
        variant: "outlined",
        label: "Minumum Sallary",
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    maxSallary: {
      elementConfig: {
        type: "number",
        variant: "outlined",
        label: "Maximum Sallary",
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    minDegree: {
      elementType: "select",
      elementConfig: {
        variant: "outlined",
        label: "Minimum Degree",
        options: ["SD", "SMP", "SMK", "S1", "S2"],
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    description: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Job Description",
        multiline: true,
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
  });

  const onInputChange = (id, event) => {
    const updatedForm = inputChangeHandler(form, id, event.target.value);
    setForm(updatedForm);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        jobsActions.updateJobs(
          match.params.jobId,
          form.name.value,
          form.categories.value,
          form.minSallary.value,
          form.maxSallary.value,
          form.minDegree.value,
          form.description.value
        )
      );
    },
    [dispatch, form, match.params.jobId]
  );

  const setOptionsChange = useCallback(() => {
    if (categories && categories.length > 0) {
      const updateCategoriesOptions = optionsChange(
        form,
        "categories",
        categories,
        job.categories
      );
      setForm(updateCategoriesOptions);
    }
  }, [categories]);

  const fetchJob = useCallback(() => {
    dispatch(jobsActions.fetchJob(match.params.jobId));
  }, [dispatch, match.params.jobId]);

  const fetchCategories = useCallback(() => {
    dispatch(catActions.fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  useEffect(() => {
    if (job !== null) {
      setForm(setFormValue(form, job, ["categories"]));
      fetchCategories();
    }
  }, [job]);

  useEffect(() => {
    setOptionsChange();
  }, [setOptionsChange]);

  let formElements = <Spinner />;

  if (job && categories) {
    formElements = (
      <Fragment>
        <InputGenerator form={form} onInputChange={onInputChange} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={onSubmit}
        >
          {loading ? "Loading..." : "Save"}
        </Button>
      </Fragment>
    );
  }

  return (
    <Grid item xs={12} sm={6}>
      <Paper>
        <div className={classes.title}>
          <IconButton size="small" component={Link} to="/jobs/joblist">
            <ArrowBackIcon />
          </IconButton>
          <Typography className={classes.titleText}>Form Job Job</Typography>
        </div>
        <Divider />
        <form className={classes.form} noValidate>
          <Alerts />
          {formElements}
        </form>
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleText: {
    color: theme.palette.primary.main,
    marginLeft: 5,
    fontSize: 18,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: theme.spacing(2),
  },
}));

export default EditForm; // eslint-disable-line react-hooks/exhaustive-deps
