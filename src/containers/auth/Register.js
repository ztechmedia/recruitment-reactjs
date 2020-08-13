import React, { Fragment, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inputChangeHandler, showPassword } from "../../utils/utility";
import { Link as RouterLink } from "react-router-dom";
import * as actions from "../../store/actions/auth";

//material components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import InputGenerator from "../../components/ui/InputGenerator";
import Alerts from "../../components/ui/Alerts";

const Register = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => state.auth.loading);
  const [form, setForm] = useState({
    name: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Name",
        autoFocus: true,
      },
      value: "",
      validation: {
        required: true,
      },
      touched: false,
    },
    email: {
      elementConfig: {
        type: "email",
        variant: "outlined",
        label: "Email Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      touched: false,
    },
    password: {
      elementType: "password",
      elementConfig: {
        variant: "outlined",
        label: "Password",
        helperText: "Min 6 Character",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      touched: false,
      show: false,
    },
    confirmPassword: {
      elementType: "password",
      elementConfig: {
        variant: "outlined",
        label: "Password Confirmation",
        helperText: "Min 6 Character",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      touched: false,
      show: false,
    },
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        actions.register(
          form.name.value,
          form.email.value,
          form.password.value,
          form.confirmPassword.value
        )
      );
    },
    [dispatch, form]
  );

  const onInputChange = (id, event) => {
    const updatedForm = inputChangeHandler(form, id, event.target.value);
    setForm(updatedForm);
  };

  const onShowPassword = (id) => {
    const updatedForm = showPassword(form, id);
    setForm(updatedForm);
  };

  let formElements = (
    <InputGenerator
      form={form}
      onInputChange={onInputChange}
      onShowPassword={onShowPassword}
    />
  );

  return (
    <Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Registration
      </Typography>
      <Alerts />
      <form className={classes.form} noValidate>
        {formElements}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
          onClick={(e) => onSubmit(e)}
        >
          {loading ? "Loading..." : "Register"}
        </Button>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} variant="body2" to="/login">
              {"Have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Register;
