import React, { useState, useEffect, useContext } from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

const Main = (props) => {

  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);

  console.log(cards)


  return (
    <main className="content page__content section section_size_narrow">
      <section className="profile">
        <div className="profile__user">
          <div
            className="profile__user-avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={props.onEditAvatar}
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
            onClick={props.onEditProfile}
          />
        </div>
        <button
          arial-lable="Открыть форму для добавления фотографий на страницу"
          tittle="Добавить"
          type="button"
          className="button profile__button-add"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <Card key={card._id} card={card} onCardClick={props.onCardClick} />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
