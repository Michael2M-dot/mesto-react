import React, { useEffect, useState } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isSubmitted }) => {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  useEffect(() => {
    if (!isSubmitted) {
      setPlaceName("");
      setPlaceLink("");
    }
  }, [isSubmitted]);

  const handlePlaceLinkChange = (e) => {
    setPlaceLink(e.target.value);
  };

  const handlePlaceNameChange = (e) => {
    setPlaceName(e.target.value);
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
  };

  return (
    <PopupWithForm
      name={"user-card"}
      title={"Новое место"}
      button={!isSubmitted ? "Создать" : "Сохранение"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      idSubmitted={isSubmitted}
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
      />
      <Input
        type="url"
        value={placeLink || ""}
        id="place-link"
        placeholder="Ссылка на картинку (обязательно)"
        name="placeLinkInput"
        required={true}
        onChange={handlePlaceLinkChange}
      />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
