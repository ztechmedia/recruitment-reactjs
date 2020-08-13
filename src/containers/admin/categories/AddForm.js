import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  inputChangeHandler,
  showPassword,
  clearForm,
} from "../../../utils/utility";
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

const AddForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const success = useSelector((state) => state.categories.success);
  const loading = useSelector((state) => state.categories.loading);

  const [form, setForm] = useState({
    name: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Job Categories",
        autoFocus: true,
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

  const onShowPassword = (id) => {
    const updatedForm = showPassword(form, id);
    setForm(updatedForm);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(catActions.addCategories(form.name.value));
    },
    [dispatch, form]
  );

  const clearFormHandler = useCallback(() => {
    setForm(clearForm(form));
  }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    clearFormHandler();
  }, [clearFormHandler]); // eslint-disable-line react-hooks/exhaustive-deps

  let formElements = (
    <InputGenerator
      form={form}
      onInputChange={onInputChange}
      onShowPassword={onShowPassword}
    />
  );

  return (
    <Grid item xs={12} sm={6}>
      <Paper>
        <div className={classes.title}>
          <IconButton size="small" component={Link} to="/master/categories">
            <ArrowBackIcon />
          </IconButton>
          <Typography className={classes.titleText}>
            Form Job Category
          </Typography>
        </div>
        <Divider />

        <form className={classes.form} noValidate>
          <Alerts />
          {formElements}
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

export default AddForm;
