import React from "react";
import { formMakeArray } from "../../utils/utility";
import Input from "./Input";

const FormGenerator = (props) => {
  const { form, onInputChange, onShowPassword } = props;
  const formElemenArray = formMakeArray(form);

  return formElemenArray.map((formEl) => (
    <Input
      key={formEl.id}
      elementType={formEl.config.elementType}
      elementConfig={formEl.config.elementConfig}
      value={formEl.config.value}
      shouldValidate={formEl.config.validation}
      touched={formEl.config.touched}
      invalid={!formEl.config.valid}
      changed={(event) => onInputChange(formEl.id, event)}
      clicked={
        formEl.config.show !== undefined && onShowPassword
          ? () => onShowPassword(formEl.id)
          : () => console.log("show click function is not defined")
      }
      show={formEl.config.show !== undefined ? formEl.config.show : null}
    />
  ));
};

export default FormGenerator;
