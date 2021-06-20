import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState({}); //стэйт создан для хранения данных о карточке, без него после закрытия на мгновенье появляется окно с alt

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
    setSelectedCard(true);
    setSelectedCardData(value);
  };

  const closeAllPopup = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  };

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopup();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose, false);

    return () => {
      document.removeEventListener("keydown", handleEscClose, false);
    };
  }, []);

  return (
    <div className="page" onKeyDown={handleEscClose}>
      <div className="page__container">
        <Header mix={"page__header section"}/>
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer mix={"page__footer"}/>
      </div>

      <PopupWithForm
        name={"user-profile"}
        title={"Редактировать профиль"}
        button={"Сохранить"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
      >
        <Input
          type={"text"}
          id={"user-name"}
          placeholder={"Имя"}
          name={"userNameInput"}
          required={true}
          maxLength={"40"}
          minLength={"2"}
        />
        <Input
          type={"text"}
          id={"user-job"}
          placeholder={"О себе"}
          name={"userJobInput"}
          required={true}
          maxLength={"200"}
          minLength={"2"}
        />
      </PopupWithForm>

      <PopupWithForm
        name={"user-avatar"}
        title={"Обновить аватар"}
        button={"Сохранить"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
      >
        <Input
          type={"url"}
          id={"avatar-link"}
          placeholder={"Ссылка на изображение (обязательно)"}
          name={"avatarLinkInput"}
          required={true}
          maxLength={""}
          minLength={""}
        />
      </PopupWithForm>

      <PopupWithForm
        name={"user-card"}
        title={"Новое место"}
        button={"Создать"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
      >
        <Input
          type={"text"}
          id={"place-name"}
          placeholder={"Название (обязательно)"}
          name={"placeNameInput"}
          required={true}
          maxLength={"30"}
          minLength={"2"}
        />
        <Input
          type={"url"}
          id={"place-link"}
          placeholder={"Ссылка на картинку (обязательно)"}
          name={"placeLinkInput"}
          required={true}
          maxLength={""}
          minLength={""}
        />
      </PopupWithForm>

      <ImagePopup
        isOpen={selectedCard}
        data={selectedCardData}
        onClose={closeAllPopup}
      />
    </div>
  );
};

export default App;