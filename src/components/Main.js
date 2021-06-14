import React, {useState, useEffect} from "react";
import api from "../utils/Api";

const Main = (props) => {

    const [userName, setUserName] = useState('Не зарегистрированный пользователь')
    const [userDescription, setUserDescription] = useState('Не зарегистрированный пользователь')
    const [userAvatar, setUserAvatar] = useState('')

    const handleUserData =() => {
        api
            .getUserData()
            .then((userData) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
            })
            .catch((err) =>
                console.log(
                    `Непредвиденная ошибка при начальной загрузке страницы: ${err.status} ${err.statusText}`
                )
            );
    }


    useEffect(()=> {
        handleUserData();
    }, [])

  return (
    <main className="content page__content section section_size_narrow">
      <section className="profile">
        <div className="profile__user">
          <div
            className="profile__user-avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
            onClick={props.onEditAvatar}
          ></div>
          <div className="profile__user-info profile__user-info_margins_top-bottom profile__user-info_margins_left-right">
            <h1 className="profile__user-name">{userName}</h1>
            <p className="profile__user-job">{userDescription}</p>
          </div>
          <button
            arial-lable="Открыть форму для изменения данных о пользователе"
            tittle="Открыть"
            type="button"
            className="button profile__button-edit"
            id="profile-editBtn"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          arial-lable="Открыть форму для добавления фотографий на страницу"
          tittle="Добавить"
          type="button"
          className="button profile__button-add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  );
}

export default Main;


