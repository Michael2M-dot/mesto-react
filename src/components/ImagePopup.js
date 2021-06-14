import React from "react";

const ImagePopup = (props) => {
  console.log(props);
  return (
    <section
      className={`popup page__popup section ${
        props.isOpen ? "page__popup_visible" : ""
      }`}
      id="picture-popup"
      onClick={props.onClose}
    >
      <div className="popup__window popup__window_size_l">
        <button
          arial-lable="Закрыть окно просмотра фотографии"
          tittle="Закрыть"
          type="button"
          className="button popup__button-close popup__button-close_pos_inside"
          id="close-PicturePopup"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.isOpen.link}
            alt={`Нам очень жаль что вы не можете увидеть изображение этого красивого места ${props.isOpen.name}`}
          />
          <figcaption className="popup__caption">
            {props.isOpen.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ImagePopup;
