import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Input from "./Input";
import {urlRegex} from "../utils/regex";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isSubmitted }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidUserAbout, setIsValidUserAbout] = useState(false)
  const [validMessageName, setValidMessageName] = useState('');
  const [validMessageAbout, setValidMessageAbout] = useState('');
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(()=>{
    if(isValidUserName && isValidUserAbout){
      setIsFormValid(true);
    } else if (isSubmitted){
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  },[name, description, currentUser, isValidUserName, isValidUserAbout, isFormValid, isSubmitted])


  const handleChangeName = (e) => {
     if(e.target.value.length <= 2 || e.target.value.length > 50){
       setIsValidUserName(false)
       setValidMessageName(e.target.validationMessage)
       setName(e.target.value)
    } else if(e.target.value ==="") {
       setIsValidUserName(false)
       setValidMessageName(e.target.validationMessage)
       setName(e.target.value)
    } else {
       setIsValidUserName(true)
       setName(e.target.value);
       setValidMessageName('')
    }
  };


  const handleChangeDescription = (e) => {
    if(e.target.value.length <= 2 || e.target.value.length > 200){
      setIsValidUserAbout(false)
      setValidMessageAbout(e.target.validationMessage)
      setDescription(e.target.value)
    } else if(e.target.value ==="") {
      setIsValidUserAbout(false)
      setValidMessageAbout(e.target.validationMessage)
      setDescription(e.target.value)
    } else {
      setIsValidUserAbout(true)
      setDescription(e.target.value);
      setValidMessageAbout('')
    }
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // const handleChangeName = (e) => {
  //   setName(e.target.value);
  // };

  // const handleChangeDescription = (e) => {
  //   setDescription(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitted) {
      return;
    }

    onUpdateUser({
      name,
      about: description,
    });

    setIsValidUserAbout(false);
    setIsValidUserName(false);
    setIsFormValid(false)
  };

  return (
    <PopupWithForm
      name={"user-profile"}
      title={"Редактировать профиль"}
      button={!isSubmitted ? "Сохранить" : "Сохранение"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      isFormValid={isFormValid}
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
        notice={!isValidUserName ? validMessageName : ""}
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
        notice={!isValidUserAbout ? validMessageAbout : ""}
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
