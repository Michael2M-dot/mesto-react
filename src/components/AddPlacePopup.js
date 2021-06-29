import React, { useState } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, currentUser }) => {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  const handlePlaceLinkChange = (e) => {
    setPlaceLink(e.target.value);
  };

  const handlePlaceNameChange = (e) => {
    setPlaceName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: placeName,
      link: placeLink,
      _id: currentUser._id,
      // likes: [],
      owner: {
        _id: currentUser._id,
      },
    });
  };

  return (
    <PopupWithForm
      name={"user-card"}
      title={"Новое место"}
      button={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        type={"text"}
        value={placeName}
        id={"place-name"}
        placeholder={"Название (обязательно)"}
        name={"placeNameInput"}
        required={true}
        maxLength={"30"}
        minLength={"2"}
        onChange={handlePlaceNameChange}
      />
      <Input
        type={"url"}
        value={placeLink}
        id={"place-link"}
        placeholder={"Ссылка на картинку (обязательно)"}
        name={"placeLinkInput"}
        required={true}
        maxLength={""}
        minLength={""}
        onChange={handlePlaceLinkChange}
      />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
