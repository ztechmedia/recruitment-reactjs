export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const addArray = (oldArrayState, updatedProperties) => {
  return [...oldArrayState, updatedProperties];
};

export const formMakeArray = (form) => {
  const formElemenArray = [];
  for (let key in form) {
    formElemenArray.push({
      id: key,
      config: form[key],
    });
  }
  return formElemenArray;
};

export const inputChangeHandler = (form, id, value) => {
  return updateObject(form, {
    [id]: updateObject(form[id], {
      value: value,
      valid: checkValidity(value, form[id].validation),
      touched: true,
    }),
  });
};

export const optionsChange = (form, id, option, optionValue = "") => {
  return updateObject(form, {
    [id]: updateObject(form[id], {
      value: optionValue,
      elementConfig: updateObject(form[id].elementConfig, {
        options: option,
      }),
    }),
  });
};

const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) return true;
  if (rules.required) isValid = value.length > 0 && isValid;
  if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
  if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

  if (rules.isEmail) {
    /* eslint-disable */
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const showPassword = (form, id) => {
  return updateObject(form, {
    [id]: updateObject(form[id], {
      show: !form[id].show,
    }),
  });
};

export const objectToArray = (form) => {
  const formElemenArray = [];
  for (let key in form) {
    formElemenArray.push({
      id: key,
      ...form[key],
    });
  }
  return formElemenArray;
};

export const clearForm = (form) => {
  let clearValue = {};
  for (let key in form) {
    clearValue[key] = updateObject(form[key], {
      value: "",
      touched: false,
    });
  }
  return clearValue;
};

export const setFormValue = (form, data, exclude) => {
  let setValue = {};
  if (exclude) {
    for (let key in form) {
      if (!exclude.includes(key)) {
        setValue[key] = updateObject(form[key], {
          valid: true,
          value: data[key],
        });
      } else {
        setValue[key] = updateObject(form[key], {
          valid: true,
          value: "",
        });
      }
    }
  } else {
    for (let key in form) {
      setValue[key] = updateObject(form[key], {
        valid: true,
        value: data[key],
      });
    }
  }

  return setValue;
};

export const toIdr = (number) => {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export const setCurrentUrl = (currentUrl) => {
  localStorage.setItem("currentUrl", currentUrl);
};

export const checkFormValidity = (form) => {
  let isValid = true;
  for (let key in form) {
    if (form[key].validation) {
      isValid = form[key].valid && isValid;
    }
  }
  return isValid;
};
