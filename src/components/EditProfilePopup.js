import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Input from "./Input";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isSubmitted }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitted) {
      return;
    }

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name={"user-profile"}
      title={"Редактировать профиль"}
      button={!isSubmitted ? "Сохранить" : "Сохранение"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      idSubmitted={isSubmitted}
    >
      <Input
        type={"text"}
        value={name || ""}
        id={"user-name"}
        name={"userNameInput"}
        placeholder={"Имя"}
        required={true}
        maxLength={"40"}
        minLength={"2"}
        onChange={handleChangeName}
      />

      <Input
        type={"text"}
        value={description || ""}
        id={"user-job"}
        name={"userNameInput"}
        placeholder={"О себе"}
        required={true}
        maxLength={"200"}
        minLength={"2"}
        onChange={handleChangeDescription}
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
