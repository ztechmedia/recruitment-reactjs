import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  inputChangeHandler,
  checkFormValidity,
  clearForm,
} from "../../../../utils/utility";
import * as usersActions from "../../../../store/actions/users";

//material components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//ui components
import InputGenerator from "../../../ui/InputGenerator";

const AddEducation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const loading = useSelector((state) => state.users.loading);
  const success = useSelector((state) => state.users.success);

  const [form, setForm] = useState({
    school: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "School",
        autoFocus: true,
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    degree: {
      elementType: "select",
      elementConfig: {
        variant: "outlined",
        label: "Degree",
        options: ["SD", "SMP", "SMK", "S1", "S2"],
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    fieldofstudy: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Field Of Study",
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
        usersActions.addEducation(
          form.school.value,
          form.degree.value,
          form.fieldofstudy.value,
          form.from.value,
          form.to.value,
          form.description.value
        )
      );
    },
    [dispatch, form]
  );

  const clearFormHandler = useCallback(() => {
    setForm(clearForm(form));
  }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    clearFormHandler();
  }, [clearFormHandler]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsValid(checkFormValidity(form));
  }, [setIsValid, form]);

  let formElements = (
    <InputGenerator form={form} onInputChange={onInputChange} />
  );

  return (
    <form className={classes.form} noValidate>
      <IconButton size="small" component={Link} to="/profile/education/list">
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

export default AddEducation;
