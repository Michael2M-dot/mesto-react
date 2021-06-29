import React, { useState, useEffect, useContext } from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

const Main = ({ onAddPlace, onCardClick, onEditAvatar, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  //получаем массив исходных карточек
  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(
          `Непредвиденная ошибка при загрузке карточек: ${err.status} ${err.statusText}`
        );
      });
  }, [setCards]);

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
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(
          `Ошибка при удалении карточки: ${err.status} ${err.statusText}`
        );
      });
  };

  return (
    <main className="content page__content section section_size_narrow">
      <section className="profile">
        <div className="profile__user">
          <div
            className="profile__user-avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}
          />
          <div className="profile__user-info profile__user-info_margins_top-bottom profile__user-info_margins_left-right">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <p className="profile__user-job">{currentUser.about}</p>
          </div>
          <button
            arial-lable="Открыть форму для изменения данных о пользователе"
            tittle="Открыть"
            type="button"
            className="button profile__button-edit"
            id="profile-editBtn"
            onClick={onEditProfile}
          />
        </div>
        <button
          arial-lable="Открыть форму для добавления фотографий на страницу"
          tittle="Добавить"
          type="button"
          className="button profile__button-add"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <CardContext.Provider value={card}>
              <Card
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </CardContext.Provider>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
