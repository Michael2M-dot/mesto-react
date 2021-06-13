import React, { useState, useEffect} from "react";
import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";


function App() {


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    // document.querySelector("#edit-profile").classList.add("page__popup_visible");
  }
  console.log(isEditProfilePopupOpen);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    document.querySelector("#add-place").classList.add("page__popup_visible");
  }
  console.log(isAddPlacePopupOpen)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    document.querySelector("#add-avatar").classList.add("page__popup_visible");
  }
  console.log(isEditAvatarPopupOpen)


  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
        />
        <Footer />
      </div>

      {/*{isEditProfilePopupOpen && <PopupWithForm isOpen={isEditProfilePopupOpen} />}*/}

      <PopupWithForm
          name={'user-profile'}
          title={'Редактировать профиль'}
          button={'Сохранить'}
          isOpen={isEditProfilePopupOpen}
      />

      <ImagePopup />

      <template className="element__template" id="cards-template">
        <li className="element elements__list-item">
          <img src=" " alt="" className="element__image" />
          <div className="element__heading">
            <h2 className="element__title"></h2>
            <div className="element__like-and-count">
              <button
                arial-lable="Поставить/снять лайк на карточке"
                tittle="Поставить/снять лайк"
                type="button"
                className="element__like"
              ></button>
              <p className="element__count">0</p>
            </div>
          </div>
          <button
            arial-lable="Удалить карточку со страницы"
            tittle="Удалить"
            type="button"
            className="button element__trash element__trash_hidden"
            id="delete-Btn"
          ></button>
        </li>
      </template>
    </div>
  );
}

// ReactDOM.render(<App/>, document.querySelector('#root'));

export default App;


// <section className="popup page__popup section" id="picture-popup">
//   <div className="popup__window popup__window_size_l">
//     <button
//         arial-lable="Закрыть окно просмотра фотографии"
//         tittle="Закрыть"
//         type="button"
//         className="button popup__button-close popup__button-close_pos_inside"
//         id="close-PicturePopup"
//     ></button>
//     <figure className="popup__figure">
//       <img className="popup__image" src="#" alt="#" />
//       <figcaption className="popup__caption"></figcaption>
//     </figure>
//   </div>
// </section>

/*
<section className="popup page__popup section" id="edit-profile">
  <div className="popup__window popup__window_size_s">
    <h2 className="popup__title">Редактировать профиль</h2>
    <button
        arial-lable="Закрыть форму для изменения данных о пользователе"
        tittle="Закрыть"
        type="button"
        className="button popup__button-close"
        id="close-userPopup"
    ></button>
    <form
        className="form"
        id="user-profile"
        name="userProfileForm"
        autoComplete="off"
        noValidate
    >
      <label className="form__fieldset" htmlFor="user-name-input">
        <input
            type="text"
            className="form__input"
            id="user-name-input"
            name="userNameInput"
            placeholder="Имя"
            required
            maxLength="40"
            minLength="2"
        />
        <span
            className="form__input-error"
            id="user-name-input-error"
        ></span>
      </label>
      <label className="form__fieldset" htmlFor="user-job-input">
        <input
            type="text"
            className="form__input form__user-job"
            id="user-job-input"
            name="userJobInput"
            placeholder="О себе"
            required
            maxLength="200"
            minLength="2"
        />
        <span
            className="form__input-error"
            id="user-job-input-error"
        ></span>
      </label>
      <button
          arial-lable="Сохранить изменения данных о пользователе"
          type="submit"
          className="button form__submit-btn"
          id="user-submit"
      >
        <div className="button__wrapper">
          <div className="button__text">Сохранить</div>
          <div className="button__jumping-dots button__jumping-dots_visibility_hidden">
            <span className="button__jumping-dots jump">.</span>
            <span className="button__jumping-dots jump">.</span>
            <span className="button__jumping-dots jump">.</span>
          </div>
        </div>
      </button>
    </form>
  </div>
</section>


<section className="popup page__popup section" id="add-place">
  <div className="popup__window popup__window_size_s">
    <h2 className="popup__title">Новое место</h2>
    <button
        arial-lable="Закрыть форму для добавления фотографий на страницу"
        tittle="Закрыть"
        type="button"
        className="button popup__button-close"
        id="close-placePopup"
    ></button>
    <form
        className="form"
        id="place-form"
        name="placeCardForm"
        autoComplete="off"
        noValidate
    >
      <label className="form__fieldset" htmlFor="place-name-input">
        <input
            type="text"
            className="form__input"
            id="place-name-input"
            name="placeNameInput"
            placeholder="Название (обязательно)"
            required
            maxLength="30"
            minLength="2"
        />
        <span
            className="form__input-error"
            id="place-name-input-error"
        ></span>
      </label>
      <label className="form__fieldset" htmlFor="place-link-input">
        <input
            type="url"
            className="form__input form__place-link"
            id="place-link-input"
            name="placeLinkInput"
            placeholder="Ссылка на картинку (обязательно)"
            required
        />
        <span
            className="form__input-error"
            id="place-link-input-error"
        ></span>
      </label>
      <button
          arial-lable="Создать карточку нового места"
          type="submit"
          className="button form__submit-btn"
          id="place-submit"
      >
        <div className="button__wrapper">
          <div className="button__text">Создать</div>
          <div className="button__jumping-dots button__jumping-dots_visibility_hidden">
            <span className="button__jumping-dots jump">.</span>
            <span className="button__jumping-dots jump">.</span>
            <span className="button__jumping-dots jump">.</span>
          </div>
        </div>
      </button>
    </form>
  </div>
</section>

<section className="popup page__popup section" id="delete-card">
  <div className="popup__window popup__window_size_s">
    <h2 className="popup__title">Вы уверены?</h2>
    <form
        className="form"
        id="delete-card-form"
        name="placeCardForm"
        autoComplete="off"
        noValidate
    >
      <button
          arial-lable="Закрыть форму подтверждения действия пользователя"
          tittle="Закрыть"
          type="button"
          className="button popup__button-close"
          id="close-approvalPopup"
      ></button>
      <button
          arial-lable="Подтвердить действие"
          type="submit"
          className="button form__submit-btn"
          id="approval-submit"
      >
        <div className="button__wrapper">
          <div className="button__text">Да</div>
          <div className="button__jumping-dots button__jumping-dots_visibility_hidden">
            <span className="button__jumping-dots jump">.</span>
            <span className="button__jumping-dots jump">.</span>
            <span className="button__jumping-dots jump">.</span>
          </div>
        </div>
      </button>
    </form>
  </div>
</section>

<section className="popup page__popup section" id="add-avatar">
  <div className="popup__window popup__window_size_s">
    <h2 className="popup__title">Обновить аватар</h2>
    <button
        arial-lable="Закрыть форму для добавления фотографий на страницу"
        tittle="Закрыть"
        type="button"
        className="button popup__button-close"
        id="close-avatarPopup"
    ></button>
    <form
        className="form"
        id="avatar-form"
        name="avatarForm"
        autoComplete="off"
        noValidate
    >
      <label className="form__fieldset" htmlFor="place-link-input">
        <input
            type="url"
            className="form__input form__place-link"
            id="avatar-link-input"
            name="avatarLinkInput"
            placeholder="Ссылка на изображение (обязательно)"
            required
        />
        <span
            className="form__input-error"
            id="avatar-link-input-error"
        ></span>
      </label>
      <button
          arial-lable="Добавляет новое изображение на аватар пользователя"
          type="submit"
          className="button form__submit-btn"
          id="avatar-submit"
      >
        <div className="button__wrapper">
          <div className="button__text">Сохранить</div>
          <div className="button__jumping-dots button__jumping-dots_visibility_hidden">
            <span className="button__jumping-dots jump">.</span>
            <span className="button__jumping-dots jump">.</span>
            <span className="button__jumping-dots jump">.</span>
          </div>
        </div>
      </button>
    </form>
  </div>
</section>*/
