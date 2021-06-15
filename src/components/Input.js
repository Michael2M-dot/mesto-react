import React from "react";

const Input = (props) => {
  return (
    <label className="form__fieldset" htmlFor={`${props.id}-input`}>
      <input
        type={props.type}
        className="form__input"
        id={`${props.id}-input`}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        maxLength={props.maxLength}
        minLength={props.minLength}
      />
      <span className="form__input-error" id={`${props.name}-input-error`} />
    </label>
  );
};

export default Input;
