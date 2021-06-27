import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState({}); //стэйт создан для хранения данных о карточке, без него после закрытия на мгновенье появляется окно с alt
  const [currentUser, setCurrentUser] = useState({});

  //    получаем данные о пользователе и записываем в стэйт переменную
  useEffect(()=> {
    api
        .getUserData()
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch((err)=>{
          console.log(
              `Непредвиденная ошибка при загрузке данных пользователя: ${err.status} ${err.statusText}`
          )
        })
  },[setCurrentUser]);




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
    if(isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        isEditAvatarPopupOpen ||
        selectedCard){
      document.addEventListener("keydown", handleEscClose, {once: true});
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard]);

  return (

      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
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
      </CurrentUserContext.Provider>

  );
};

export default App;
