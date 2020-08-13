import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inputChangeHandler, clearForm } from "../../utils/utility";
import { Link as RouterLink } from "react-router-dom";
import * as actions from "../../store/actions/auth";

//material components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import InputGenerator from "../../components/ui/InputGenerator";
import Alerts from "../../components/ui/Alerts";

const ReqToken = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => state.auth.loading);
  const success = useSelector((state) => state.auth.success);
  const [form, setForm] = useState({
    email: {
      elementConfig: {
        type: "email",
        variant: "outlined",
        label: "Email Address",
        autoFocus: true,
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      touched: false,
    },
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(actions.sendPasswordToken(form.email.value));
    },
    [dispatch, form]
  );

  const onInputChange = (id, event) => {
    const updatedForm = inputChangeHandler(form, id, event.target.value);
    setForm(updatedForm);
  };

  const clearFormHandler = useCallback(() => {
    setForm(clearForm(form));
  }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    clearFormHandler();
  }, [clearFormHandler]);

  let formElements = (
    <InputGenerator form={form} onInputChange={onInputChange} />
  );

  return (
    <Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Send Token Password
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
          {loading ? "Sending..." : "Send Token"}
        </Button>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Rregister"}
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

export default ReqToken;
