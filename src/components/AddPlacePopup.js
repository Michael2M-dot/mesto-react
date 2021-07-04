import React, { useEffect, useState } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import {urlRegex} from "../utils/regex";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isSubmitted }) => {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");
  const [isValidLink, setIsValidLink] = useState(false);
  const [isValidName, setIsValidName] = useState(false)
  const [validMessageLink, setValidMessageLink] = useState('');
  const [validMessage, setValidMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(()=>{
    if(isValidName && isValidLink){
      setIsFormValid(true);
    } else if (isSubmitted){
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  },[placeLink, placeName, isValidLink, isValidName, isFormValid, isSubmitted])

  useEffect(() => {
    if (!isSubmitted) {
      setPlaceName("");
      setPlaceLink("");
    }
  }, [isSubmitted]);

  //функционал валидации поля ввода ссылки на картинку
  const handlePlaceLinkChange = (e) => {
    if(!urlRegex.test(e.target.value)){
      setIsValidLink(false)
      setValidMessageLink(e.target.validationMessage)
      setPlaceLink(e.target.value);
    } else if(e.target.value.length <= 2){
      setIsValidLink(false)
      setValidMessageLink(e.target.validationMessage)
      setPlaceLink(e.target.value)
    } else if(e.target.value ==="") {
      setIsValidLink(false)
      setValidMessageLink(e.target.validationMessage)
      setPlaceLink(e.target.value);
    } else {
      setIsValidLink(true)
      setPlaceLink(e.target.value);
      setValidMessageLink('')
    }
  };

  //функционал валидации поля ввода имени
  const handlePlaceNameChange = (e) => {
    if(e.target.value.length <= 2){
      setIsValidName(false)
      setValidMessage(e.target.validationMessage)
      setPlaceName(e.target.value);
    } else if(e.target.value ===""){
      setIsValidName(false)
      setValidMessage(e.target.validationMessage)
      setPlaceName(e.target.value);
    } else{
      setIsValidName(true)
      setPlaceName(e.target.value);
      setValidMessage('')
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitted) {
      return;
    }

    onAddPlace({
      name: placeName,
      link: placeLink,
    });

    setIsValidLink(false);
    setIsValidName(false);
    setIsFormValid(false)

  };


  return (
    <PopupWithForm
      name={"user-card"}
      title={"Новое место"}
      button={!isSubmitted ? "Создать" : "Сохранение"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      isFormValid={isFormValid}
    >
      <Input
        type="text"
        value={placeName || ""}
        id="place-name"
        placeholder="Название (обязательно)"
        name="placeNameInput"
        required={true}
        maxLength="30"
        minLength="2"
        onChange={handlePlaceNameChange}
        notice={!isValidName ? validMessage : ""}
      />
      <Input
        type="url"
        value={placeLink || ""}
        id="place-link"
        placeholder="Ссылка на картинку (обязательно)"
        name="placeLinkInput"
        required={true}
        onChange={handlePlaceLinkChange}
        notice={!isValidLink ? validMessageLink : ""}
      />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
