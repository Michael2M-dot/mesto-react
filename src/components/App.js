import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardData, setSelectedCardData] = useState({}); //стэйт создан для хранения данных о карточке, без него после закрытия на мгновенье появляется окно с alt
  const [currentUser, setCurrentUser] = useState({});

  //    получаем данные о пользователе и записываем в стэйт переменную
  useEffect(() => {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при загрузке данных пользователя: ${err.status} ${err.statusText}`
        );
      });
  }, [setCurrentUser]);

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

  const closeAllPopups = (evt) => {
    if (
      !evt.target.classList.contains("page__window")
    ) {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard(false);
    }
  };

  //закрытие попапов по нажатию ESC
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  //установка слушателя для закрытия попапа по ESC
  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      selectedCard
    ) {
      document.addEventListener("keydown", handleEscClose, { once: true });
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard,
  ]);


  //функция обновления информации о пользователе
  const handleUserUpdate = (data) => {
    api
      .updateUserData(data)
      .then(() => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при передаче на сервер данных пользователя: ${err.status} ${err.statusText}`
        );
      })
      .finally(() => {
        setIsEditProfilePopupOpen(false);
      });
  };

  //функционал обновления аватара пользователя
  const handleAvatarUpdate = (data) => {
    api
        .updateAvatar()
        .then (() => {
          setCurrentUser(...currentUser, data.avatar)
        })
        .catch((err) => {
          console.log(
              `Непредвиденная ошибка при загрузки изображения аватара: ${err.status} ${err.statusText}`
          );
        })
        .finally(() => {
          setIsEditProfilePopupOpen(false);
        });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header mix={"page__header section"} />
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Footer mix={"page__footer"} />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUserUpdate}
        />

        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUserUpdate}
        />

        {/*<PopupWithForm*/}
        {/*  name={"user-avatar"}*/}
        {/*  title={"Обновить аватар"}*/}
        {/*  button={"Сохранить"}*/}
        {/*  isOpen={isEditAvatarPopupOpen}*/}
        {/*  onClose={closeAllPopups}*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    type={"url"}*/}
        {/*    id={"avatar-link"}*/}
        {/*    placeholder={"Ссылка на изображение (обязательно)"}*/}
        {/*    name={"avatarLinkInput"}*/}
        {/*    required={true}*/}
        {/*    maxLength={""}*/}
        {/*    minLength={""}*/}
        {/*  />*/}
        {/*</PopupWithForm>*/}

        <PopupWithForm
          name={"user-card"}
          title={"Новое место"}
          button={"Создать"}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
