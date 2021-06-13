import React from "react";

const Main = ({onEditProfile, onAddPlace, onEditAvatar}) => {

  return (
    <main className="content page__content section section_size_narrow">
      <section className="profile">
        <div className="profile__user">
          <div
            className="profile__user-avatar"
            onClick={onEditAvatar}
          ></div>
          <div className="profile__user-info profile__user-info_margins_top-bottom profile__user-info_margins_left-right">
            <h1 className="profile__user-name"></h1>
            <p className="profile__user-job"></p>
          </div>
          <button
            arial-lable="Открыть форму для изменения данных о пользователе"
            tittle="Открыть"
            type="button"
            className="button profile__button-edit"
            id="profile-editBtn"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          arial-lable="Открыть форму для добавления фотографий на страницу"
          tittle="Добавить"
          type="button"
          className="button profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  );
}

export default Main;


