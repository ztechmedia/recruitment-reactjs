import React, { useState, useCallback, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  inputChangeHandler,
  checkFormValidity,
} from "../../../../utils/utility";
import * as userActions from "../../../../store/actions/users";

//material components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//ui components
import InputGenerator from "../../../ui/InputGenerator";

const EditProfile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = props;
  const loading = useSelector((state) => state.users.loading);
  const [isValid, setIsValid] = useState(false);
  const [form, setForm] = useState({
    name: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Name",
        autoFocus: true,
      },
      value: user ? user.name : null,
      valid: user && user.name,
      validation: {
        required: true,
      },
      touched: false,
    },
    email: {
      elementConfig: {
        type: "email",
        variant: "outlined",
        label: "Email",
      },
      value: user ? user.email : null,
      valid: user && user.email,
      validation: {
        required: true,
        isEmail: true,
      },
      touched: false,
    },
    religion: {
      elementType: "select",
      elementConfig: {
        variant: "outlined",
        label: "Religion",
        options: ["Islam", "Katolik", "Protestan", "Hindu", "Budha"],
      },
      value: user ? user.religion : null,
      valid: user && user.religion,
      validation: {
        required: true,
      },
      touched: false,
    },
    birthPlace: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Birth Place",
      },
      value: user ? user.birthPlace : null,
      valid: user && user.birthPlace,
      validation: {
        required: true,
      },
      touched: false,
    },
    birthDate: {
      elementType: "date",
      elementConfig: {
        variant: "inline",
        label: "Birth Date",
      },
      value: user ? user.birthDate : null,
      touched: false,
    },
    status: {
      elementType: "select",
      elementConfig: {
        variant: "outlined",
        label: "Marital Status",
        options: ["Menikah", "Belum Menikah"],
      },
      value: user ? user.status : null,
      valid: user && user.status,
      validation: {
        required: true,
      },
      touched: false,
    },
    street: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Street Name",
        multiline: true,
      },
      value: user && user.address ? user.address.street : null,
      touched: false,
    },
    village: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Village",
      },
      value: user && user.address ? user.address.village : null,
      touched: false,
    },
    district: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "District",
      },
      value: user && user.address ? user.address.district : null,
      touched: false,
    },
    city: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "City",
      },
      value: user && user.address ? user.address.city : null,
      touched: false,
    },
    zipcode: {
      elementConfig: {
        type: "number",
        variant: "outlined",
        label: "Zipcode",
      },
      value: user && user.address ? user.address.zipcode : null,
      touched: false,
    },
    province: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Province",
      },
      value: user && user.address ? user.address.province : null,
      touched: false,
    },
    facebook: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Facebook Account Link",
      },
      value: user && user.social ? user.social.facebook : null,
      touched: false,
    },
    instagram: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Instagram Account Link",
      },
      value: user && user.social ? user.social.instagram : null,
      touched: false,
    },
    twitter: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Twitter Account Link",
      },
      value: user && user.social ? user.social.twitter : null,
      touched: false,
    },
    youtube: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Youtube Account Link",
      },
      value: user && user.social ? user.social.youtube : null,
      touched: false,
    },
    linkedin: {
      elementConfig: {
        type: "text",
        variant: "outlined",
        label: "Linkedin Account Link",
      },
      value: user && user.social ? user.social.linkedin : null,
      touched: false,
    },
  });

  const onInputChange = (id, event) => {
    const field = id === "birthDate" ? event : event.target.value;
    const updatedForm = inputChangeHandler(form, id, field);
    setForm(updatedForm);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        userActions.updateProfile(
          form.name.value,
          form.email.value,
          form.religion.value,
          form.birthPlace.value,
          form.birthDate.value,
          form.status.value,
          form.street.value,
          form.village.value,
          form.district.value,
          form.city.value,
          form.zipcode.value,
          form.province.value,
          form.facebook.value,
          form.instagram.value,
          form.twitter.value,
          form.youtube.value,
          form.linkedin.value
        )
      );
    },
    [dispatch, form]
  );

  useEffect(() => {
    setIsValid(checkFormValidity(form));
  }, [user, form]);

  if (!user) {
    return <Redirect to="/profile/detail/data" />;
  }

  let formElements = (
    <InputGenerator form={form} onInputChange={onInputChange} />
  );

  return (
    <form className={classes.form} noValidate>
      <IconButton size="small" component={Link} to="/profile/detail/data">
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

export default EditProfile;
