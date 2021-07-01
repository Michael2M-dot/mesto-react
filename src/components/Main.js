import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onAddPlace,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  cards,
  onLikeClick,
  onDeleteClick,
}) => {
  const currentUser = useContext(CurrentUserContext);

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
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onLikeClick}
              onCardDelete={onDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
