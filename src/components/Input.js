import React from "react";

const Input = (props) => {
  return (
    <label className="form__fieldset" htmlFor={`${props.id}-input`}>
      <input {...props} className="form__input" id={`${props.id}-input`} />
      <span className="form__input-error" id={`${props.id}-input-error`} />
    </label>
  );
};

export default Input;
