import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (value) => {
    setSelectedCard(value);
  };

  const closeAllPopup = (evt) => {
    if (
      evt.target.classList.contains("page__popup") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setSelectedCard(false);
    }
  };

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setSelectedCard(false);
    }
  };

  return (
    <div className="page" onKeyDown={handleEscClose}>
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        name={"user-profile"}
        title={"Редактировать профиль"}
        button={"Сохранить"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
      />

      <PopupWithForm
        name={"user-avatar"}
        title={"Обновить аватар"}
        button={"Сохранить"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
      />

      <PopupWithForm
        name={"user-card"}
        title={"Новое место"}
        button={"Создать"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
      />

      <ImagePopup isOpen={selectedCard} onClose={closeAllPopup} />

    </div>
  );
};


export default App;
