import React from "react";

const Input = (props) => {

  return (
    <label className="form__fieldset" htmlFor={`${props.id}-input`}>
      <input
          {...props}
          className="form__input"
          id={`${props.id}-input`}
          required={props.required}
      />
      <span
          className={`form__input-error form__input-error_active`}
          id={`${props.id}-input-error`}
      >{props.notice}</span>
    </label>
  );
};

export default Input;
