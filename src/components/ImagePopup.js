import React, { useEffect } from "react";

const ImagePopup = ({ isOpen, onClose, data }) => {
  const {name, link} = data;

  return (
    <section
      className={`popup page__popup section ${
        isOpen ? "page__popup_visible" : ""
      }`}
      id="picture-popup"
      onClick={onClose}
    >
      <div className="popup__window popup__window_size_l">
        <button
          arial-lable="Закрыть окно просмотра фотографии"
          tittle="Закрыть"
          type="button"
          className="button popup__button-close popup__button-close_pos_inside"
          id="close-PicturePopup"
          onClick={onClose}
        />
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={link}
            alt={`Нам очень жаль что вы не можете увидеть изображение этого красивого места ${name}`}
          />
          <figcaption className="popup__caption">{name}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ImagePopup;
