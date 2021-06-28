import React from "react";

function PopupWithForm({name, title, isOpen, onClose, onSubmit, children, button}) {

  // const handleOverlayClosePopup = (evt) => {
  //   if(evt.target.classList.contains("page__window")){ return isOpen }
  //   return onClose
  // }

  return (
    <section
      className={`popup page__popup section ${
        isOpen ? "page__popup_visible" : ""
      }`}
      id={`edit-${name}`}
      onClick={onClose}
    >
      <div className="popup__window popup__window_size_s">
        <h2 className="popup__title">{title}</h2>
        <button
          arial-lable="Закрыть форму"
          tittle="Закрыть"
          type="button"
          className="button popup__button-close"
          id="close-userPopup"
          onClick={onClose}
        />
        <form
          className="form"
          id={`${name}`}
          name="userProfileForm"
          autoComplete="off"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            arial-lable="Сохранить изменения данных о пользователе"
            type="submit"
            className="button form__submit-btn"
            id="user-submit"
          >
            <div className="button__wrapper">
              <div className="button__text">{button}</div>
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
  );
}

export default PopupWithForm;
