/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  inputChangeHandler,
  showPassword,
  clearForm,
} from "../../../../utils/utility";
import * as usersActions from "../../../../store/actions/users";

//material components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

//compoentns
import Alerts from "../../../ui/Alerts";
import InputGenerator from "../../../ui/InputGenerator";

const AccountDetail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onSetTabActive } = props;
  const { parentHeight } = props;
  const user = useSelector((state) => state.auth.userLogged);
  const success = useSelector((state) => state.users.success);
  const loading = useSelector((state) => state.users.loading);

  const [form, setForm] = useState({
    currentPassword: {
      elementType: "password",
      elementConfig: {
        variant: "outlined",
        label: "Current Password",
        autoFocus: true,
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      touched: false,
      show: false,
    },
    newPassword: {
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

  const [emailForm, setEmailForm] = useState({
    email: {
      elementType: "email",
      elementConfig: {
        variant: "outlined",
        label: "Current Password",
      },
      value: user ? user.email : "",
      validation: {
        required: true,
        isEmail: true,
      },
      touched: false,
      show: false,
    },
  });

  const onInputChange = (id, event) => {
    const updatedForm = inputChangeHandler(form, id, event.target.value);
    setForm(updatedForm);
  };

  const onEmailInputChange = (id, event) => {
    const updatedForm = inputChangeHandler(emailForm, id, event.target.value);
    setEmailForm(updatedForm);
  };

  const onShowPassword = (id) => {
    const updatedForm = showPassword(form, id);
    setForm(updatedForm);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        usersActions.changePassword(
          form.currentPassword.value,
          form.newPassword.value,
          form.confirmPassword.value
        )
      );
    },
    [dispatch, form]
  );

  const onEmailSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(usersActions.updateEmail(user._id, emailForm.email.value));
    },
    [dispatch, user, emailForm]
  );

  const clearFormHandler = useCallback(() => {
    setForm(clearForm(form));
  }, [success]);

  useEffect(() => {
    clearFormHandler();
  }, [clearFormHandler]);

  let formElements = (
    <InputGenerator
      form={form}
      onInputChange={onInputChange}
      onShowPassword={onShowPassword}
    />
  );

  let formElements2 = (
    <InputGenerator form={emailForm} onInputChange={onEmailInputChange} />
  );

  useEffect(() => {
    onSetTabActive("Account");
  });

  return (
    <Paper
      className={classes.root}
      style={{ marginTop: (parentHeight / 2) * 0.5 }}
    >
      <div className={classes.title}>
        <Typography variant="h6">Account</Typography>
      </div>

      <Divider />
      <Grid container className={classes.box}>
        <Grid item md={5} sm={12} xs={12}>
          <Typography variant="h6">Change Password</Typography>
          <Alerts />
          <form noValidate>
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
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Typography variant="h6">Change Email</Typography>
          <form noValidate>
            {formElements2}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={onEmailSubmit}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    padding: 0,
  },
  title: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default AccountDetail;
