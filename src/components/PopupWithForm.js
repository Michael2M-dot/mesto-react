import React from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  button,
  idSubmitted,
}) {
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
          arial-lable="Закрыть форму без сохранения данных"
          tittle="Закрыть"
          type="button"
          className="button popup__button-close"
          onClick={onClose}
        />
        <form
          className="form"
          id={`${name}`}
          name={`${name}`}
          autoComplete="off"
          onSubmit={onSubmit}
        >
          {children}
          <button
            arial-lable="Подтвердите действие пользователя"
            type="submit"
            className={`button form__submit-btn ${
              idSubmitted ? "form__submit-btn_disabled" : ""
            }`}
            disabled={idSubmitted}
          >
            <div className="button__wrapper">
              <div className="button__text">{button}</div>
              <div
                className={`button__jumping-dots ${
                  idSubmitted ? "" : "button__jumping-dots_visibility_hidden"
                }`}
              >
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
