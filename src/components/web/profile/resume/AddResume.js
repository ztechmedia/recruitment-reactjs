/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { inputChangeHandler } from "../../../../utils/utility";
import * as usersActions from "../../../../store/actions/users";

//material components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//ui components
import InputGenerator from "../../../ui/InputGenerator";

const AddResume = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);

  const [form, setForm] = useState({
    resume: {
      elementType: "file",
      elementConfig: {
        type: "file",
        variant: "outlined",
        id: "resume",
      },
      value: null,
      touched: false,
    },
  });

  const onInputChange = (id, event) => {
    const updatedForm = inputChangeHandler(form, id, event.target.files[0]);
    setForm(updatedForm);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(usersActions.addResume(form.resume.value));
    },
    [dispatch, form]
  );

  let formElements = (
    <InputGenerator form={form} onInputChange={onInputChange} />
  );

  return (
    <form className={classes.form} noValidate>
      <IconButton size="small" component={Link} to="/profile/resume">
        <ArrowBackIcon />
      </IconButton>
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
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default AddResume;
