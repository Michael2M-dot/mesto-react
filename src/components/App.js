import React, { useState, useEffect, useRef } from "react";
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
  const [selectedCard, setSelectedCard] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(""); //стэйт создан для хранения данных о карточке, без него после закрытия на мгновенье появляется окно с alt
  const [currentUser, setCurrentUser] = useState({});
  const userAvatarRef = useRef(""); //отработка работы с ref в React
  const [cards, setCards] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPopupWithSubmitOpen, setIsPopupWithSubmitOpen] =useState(false)
  const [deletedCardData, setDeletedCardData] = useState("")

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

  //функционал добавления новой карточки пользователя
  const handleAddCardSubmit = (newCard) => {
    setIsSubmitted(true);

    api
      .addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при загрузки карточки пользователя: ${err.status} ${err.statusText}`
        );
      })
      .finally(() => {
        setIsAddPlacePopupOpen(false);
        setIsSubmitted(false);
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
      })
      .catch((err) => {
        console.log(
          `Ошибка при удалении карточки: ${err.status} ${err.statusText}`
        );
      })
        .finally(() => {
        setIsPopupWithSubmitOpen(false);
        setIsSubmitted(false);
      });
  };

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

  //функционал обновления аватара пользователя
  const handleAvatarUpdate = (data) => {
    setIsSubmitted(true);

    api
      .updateAvatar(data)
      .then((data) => {
        setCurrentUser(Object.assign(currentUser, { avatar: data.avatar }));
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при загрузки изображения аватара: ${err.status} ${err.statusText}`
        );
      })
      .finally(() => {
        setIsEditAvatarPopupOpen(false);
        setIsSubmitted(false);
      });
  };

  //функция обновления информации о пользователе
  const handleUserUpdate = (data) => {
    setIsSubmitted(true);

    api
      .updateUserData(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при передаче на сервер данных пользователя: ${err.status} ${err.statusText}`
        );
      })
      .finally(() => {
        setIsEditProfilePopupOpen(false);
        setIsSubmitted(false);
      });
  };

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

  const handlePopupWithForm =(data)=>{
    setIsPopupWithSubmitOpen(true)
    setDeletedCardData(data)
  }

  const closeAllPopups = (evt) => {
    if (
      evt.target.classList.contains("page__popup") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard(false);
      setIsPopupWithSubmitOpen(false);
      userAvatarRef.current.value = "";
    }
  };

  //закрытие попапов по нажатию ESC
  const handleEscClose = (evt) => {
    if (evt.keyCode === 27) {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard(false);
      setIsPopupWithSubmitOpen(false);
      userAvatarRef.current.value = "";
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
      document.addEventListener("keydown", handleEscClose);
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
            // onDeleteClick={handleCardDelete}
            onDeleteClick={handlePopupWithForm}
          />

          <Footer mix={"page__footer"} />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUserUpdate}
          isSubmitted={isSubmitted}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
          userAvatarRef={userAvatarRef}
          isSubmitted={isSubmitted}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCardSubmit}
          isSubmitted={isSubmitted}
        />

        <ImagePopup
          isOpen={selectedCard}
          data={selectedCardData}
          onClose={closeAllPopups}
        />

        <PopupWithSubmit
          isOpen={isPopupWithSubmitOpen}
          onClose={closeAllPopups}
          isSubmitted={isSubmitted}
          deleteCard={handleCardDelete}
          data={deletedCardData}
          />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;

// ${!isOpen ? setTimeout((()=>setSelectedCardData),2000) : selectedCardData}`
