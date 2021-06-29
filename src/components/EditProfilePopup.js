import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
// import Input from "./Input";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name={"user-profile"}
      title={"Редактировать профиль"}
      button={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__fieldset" htmlFor="user-name-input">
        <input
          type="text"
          value={name}
          className="form__input"
          id="user-name-input"
          name="userNameInput"
          placeholder="Имя"
          required
          maxLength="40"
          minLength="2"
          onChange={handleChangeName}
        />
        <span className="form__input-error" id="user-name-input-error" />
      </label>

      <label className="form__fieldset" htmlFor="user-job-input">
        <input
          type="text"
          value={description}
          className="form__input"
          id="user-job-input"
          name="userJobInput"
          placeholder="О себе"
          required
          maxLength="200"
          minLength="2"
          onChange={handleChangeDescription}
        />
        <span className="form__input-error" id="user-job-input-error" />
      </label>

      {/*<Input*/}
      {/*  type={"text"}*/}
      {/*  value={name}*/}
      {/*  id={"user-name"}*/}
      {/*  placeholder={"Имя"}*/}
      {/*  name={"userNameInput"}*/}
      {/*  required={true}*/}
      {/*  maxLength={"40"}*/}
      {/*  minLength={"2"}*/}
      {/*  onChange={handleChangeName}*/}
      {/*/>*/}
      {/*<Input*/}
      {/*  type={"text"}*/}
      {/*  value={description}*/}
      {/*  id={"user-job"}*/}
      {/*  placeholder={"О себе"}*/}
      {/*  name={"userJobInput"}*/}
      {/*  required={true}*/}
      {/*  maxLength={"200"}*/}
      {/*  minLength={"2"}*/}
      {/*  onChange={handleChangeDescription}*/}
      {/*/>*/}
    </PopupWithForm>
  );
};

export default EditProfilePopup;
