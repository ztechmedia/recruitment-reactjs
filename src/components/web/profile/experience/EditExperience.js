/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  inputChangeHandler,
  checkFormValidity,
  setFormValue,
} from "../../../../utils/utility";
import * as usersActions from "../../../../store/actions/users";

//material components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//ui components
import InputGenerator from "../../../ui/InputGenerator";

const EditExperience = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { match } = props;
  const [isValid, setIsValid] = useState(false);
  const isExperiences = useSelector(
    (state) => state.users.experiences !== null
  );
  const experience = useSelector((state) => state.users.experience);
  const loading = useSelector((state) => state.users.loading);

  const [form, setForm] = useState({
    title: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Title of Position",
        autoFocus: true,
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    company: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Company",
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    location: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "location of Company",
      },
      value: "",
      touched: false,
    },
    from: {
      elementConfig: {
        type: "number",
        variant: "outlined",
        label: "From",
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    to: {
      elementConfig: {
        type: "number",
        variant: "outlined",
        label: "To",
      },
      value: "",
      touched: false,
    },
    description: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Description",
        multiline: true,
      },
      value: "",
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
        usersActions.updateExperience(
          match.params.expId,
          form.title.value,
          form.company.value,
          form.location.value,
          form.from.value,
          form.to.value,
          form.description.value
        )
      );
    },
    [dispatch, form]
  );

  const fetchExperience = useCallback(() => {
    dispatch(usersActions.fetchExperience(match.params.expId));
  }, [dispatch, match.params.expId]);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  useEffect(() => {
    if (experience !== null) {
      setForm(setFormValue(form, experience));
    }
  }, [experience]);

  useEffect(() => {
    setIsValid(checkFormValidity(form));
  }, [setIsValid, form]);

  if (!isExperiences) return <Redirect to="/profile/experience/list" />;

  let formElements = (
    <InputGenerator form={form} onInputChange={onInputChange} />
  );

  return (
    <form className={classes.form} noValidate>
      <IconButton size="small" component={Link} to="/profile/experience/list">
        <ArrowBackIcon />
      </IconButton>
      {formElements}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading || !isValid}
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

export default EditExperience;
