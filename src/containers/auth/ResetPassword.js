import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inputChangeHandler, showPassword } from "../../utils/utility";
import * as actions from "../../store/actions/auth";

//material components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//ui components
import InputGenerator from "../../components/ui/InputGenerator";
import Spinner from "../../components/ui/Spinner/Spinner";
import Alerts from "../../components/ui/Alerts";

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const { match } = props;
  const classes = useStyles();
  const loading = useSelector((state) => state.auth.loading);
  const tokenPassword = useSelector((state) => state.auth.tokenPassword);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
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
      setIsLoading(true);
      dispatch(
        actions.resetPassword(
          match.params.resetToken,
          form.password.value,
          form.confirmPassword.value
        )
      );
      setIsLoading(false);
    },
    [dispatch, form, match.params.resetToken]
  );

  const onInputChange = (id, event) => {
    const updatedForm = inputChangeHandler(form, id, event.target.value);
    setForm(updatedForm);
  };

  const onShowPassword = (id) => {
    const updatedForm = showPassword(form, id);
    setForm(updatedForm);
  };

  const checkTokenPassword = useCallback(() => {
    dispatch(actions.checkTokenPassword(match.params.resetToken));
  }, [dispatch, match.params.resetToken]);

  useEffect(() => {
    checkTokenPassword();
  }, [checkTokenPassword]);

  let layout = <Spinner />;

  let formElements = (
    <InputGenerator
      form={form}
      onInputChange={onInputChange}
      onShowPassword={onShowPassword}
    />
  );

  if (!loading && tokenPassword !== null) {
    layout = (
      <Fragment>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
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
            disabled={isLoading}
            onClick={(e) => onSubmit(e)}
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </Button>
        </form>
      </Fragment>
    );
  }

  if (!loading && tokenPassword === false) {
    layout = <Typography>Token is invalid or expired</Typography>;
  }

  return layout;
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

export default ResetPassword;
