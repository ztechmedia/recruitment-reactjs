import React from "react";

//material components
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { makeStyles } from "@material-ui/core/styles";

const Input = (props) => {
  const classes = useStyles();

  let inputElement = null;
  let inputError = false;

  if (props.invalid && props.shouldValidate && props.touched) {
    inputError = true;
  }

  switch (props.elementType) {
    case "password":
      inputElement = (
        <TextField
          {...props.elementConfig}
          error={inputError}
          value={props.value}
          margin="normal"
          fullWidth={true}
          type={props.show ? "text" : "password"}
          onChange={props.changed}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={props.clicked}
                  edge="end"
                >
                  {props.show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
      break;
    case "select":
      inputElement = (
        <FormControl
          variant={props.elementConfig.variant}
          className={classes.formControl}
        >
          <InputLabel id="select-outlined-label">
            {props.elementConfig.label}
          </InputLabel>

          <Select
            labelId="select-outlined-label"
            id="select-outlined"
            value={props.value}
            onChange={props.changed}
            label={props.elementConfig.label}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {props.elementConfig.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case "select-fetch":
      inputElement = (
        <FormControl
          variant={props.elementConfig.variant}
          className={classes.formControl}
        >
          <InputLabel id="select-outlined-label">
            {props.elementConfig.label}
          </InputLabel>

          <Select
            labelId="select-outlined-label"
            id="select-outlined"
            value={props.value}
            onChange={props.changed}
            label={props.elementConfig.label}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {props.elementConfig.options.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case "date":
      inputElement = (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            {...props.elementConfig}
            disableToolbar
            className={classes.formControl}
            format="dd/MM/yyyy"
            margin="normal"
            label={props.elementConfig.label}
            value={props.value}
            onChange={props.changed}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      );
      break;
    case "file":
      inputElement = (
        <TextField
          {...props.elementConfig}
          error={inputError}
          margin="normal"
          fullWidth={true}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <TextField
          {...props.elementConfig}
          error={inputError}
          value={props.value}
          margin="normal"
          fullWidth={true}
          onChange={props.changed}
        />
      );
      break;
  }

  return inputElement;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
}));

export default Input;
