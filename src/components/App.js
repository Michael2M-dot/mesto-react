import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithSubmit from "./PopupWithSubmit";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupWithSubmitOpen, setIsPopupWithSubmitOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCard, setSelectedCard] = useState({}); //стэйт создан для хранения данных о карточке, без него после закрытия на мгновенье появляется окно с alt
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCardData, setDeletedCardData] = useState({});

  //получаем массив исходных карточек
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при загрузке карточек: ${err.status} ${err.statusText}`
        );
      });
  }, []);

  // функционал загрузки данных о пользователе с сервера
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
  }, []);

  //функционал добавления новой карточки пользователя
  const handleAddCardSubmit = (newCard) => {
    setIsSubmitted(true);

    api
      .addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
        setTimeout(() => setIsSubmitted(false), 1000);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при загрузки карточки пользователя: ${err.status} ${err.statusText}`
        );
      });
  };

  //функция управления лайками на карточке
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((items) =>
          items.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.log(
          `Ошибка при установке лайка: ${err.status} ${err.statusText}`
        );
      });
  };

  //функция удаления карточки пользователя
  const handleCardDelete = (card) => {
    setIsSubmitted(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
        setIsPopupWithSubmitOpen(false);
        setTimeout(() => setIsSubmitted(false), 1000);
      })
      .catch((err) => {
        console.log(
          `Ошибка при удалении карточки: ${err.status} ${err.statusText}`
        );
      });
  };

  //функционал обновления аватара пользователя
  const handleAvatarUpdate = (data) => {
    setIsSubmitted(true);

    api
      .updateAvatar(data)
      .then((data) => {
        setCurrentUser(Object.assign(currentUser, { avatar: data.avatar }));
        setIsEditAvatarPopupOpen(false);
        setTimeout(() => setIsSubmitted(false), 1000);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при загрузки изображения аватара: ${err.status} ${err.statusText}`
        );
      });
  };

  //функция обновления информации о пользователе
  const handleUserUpdate = (data) => {
    setIsSubmitted(true);

    api
      .updateUserData(data)
      .then((data) => {
        setCurrentUser(data);
        setIsEditProfilePopupOpen(false);
        setTimeout(() => setIsSubmitted(false), 1000);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при передаче на сервер данных пользователя: ${err.status} ${err.statusText}`
        );
      });
  };

  //функция управления открытием и закрытием попапов
  //открываем попап для добавления карточки пользователя
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //открываем попап редактирования данных о пользователе
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //открываем попапа редактирования аватара пользователя
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //открываем попап подтверждения действия пользователя
  const handlePopupWithForm = (data) => {
    setIsPopupWithSubmitOpen(true);
    setDeletedCardData(data);
  };

  //открываем попап полноразмерного изображения карточки
  const handleCardClick = (value) => {
    setIsImagePopupOpen(true);
    setSelectedCard(value);
  };

  //функция закрытия всех попапов по нажатию на крестик или клику на оверлей
  const closeAllPopups = (evt) => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsPopupWithSubmitOpen(false);
  };

  //установка слушателя для закрытия попапа по ESC
  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isImagePopupOpen ||
      isPopupWithSubmitOpen
    ) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isImagePopupOpen,
    isPopupWithSubmitOpen,
  ]);

  //обработчик закрытия попапов по клику на оверлей или крестик
  const handleClickClosePopup = (e) => {
    if (
      e.target.classList.contains("page__popup") ||
      e.target.classList.contains("popup__button-close")
    ) {
      closeAllPopups();
    }
  };

  //обработчик закрытия попапов по нажатию ESC
  const handleEscClose = (e) => {
    if (e.keyCode === 27) {
      closeAllPopups();
    }
  };

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
            cards={cards}
            onLikeClick={handleCardLike}
            onDeleteClick={handlePopupWithForm}
          />
          <Footer mix={"page__footer"} />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClickClosePopup}
          onUpdateUser={handleUserUpdate}
          isSubmitted={isSubmitted}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClickClosePopup}
          onUpdateAvatar={handleAvatarUpdate}
          isSubmitted={isSubmitted}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleClickClosePopup}
          onAddPlace={handleAddCardSubmit}
          isSubmitted={isSubmitted}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          data={selectedCard}
          onClose={handleClickClosePopup}
        />

        <PopupWithSubmit
          isOpen={isPopupWithSubmitOpen}
          onClose={handleClickClosePopup}
          isSubmitted={isSubmitted}
          deleteCard={handleCardDelete}
          data={deletedCardData}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
