import React, {useEffect} from "react";

const ImagePopup = (props) => {
  const placeName = props.data.name;
  const placeLink = props.data.link;

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        props.onClose();
        console.log("Hello")
      }
    };

    if (props.isOpen){
      document.addEventListener("keydown", handleEscClose, {once: true});
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [props.isOpen]);


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
        />
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={placeLink}
            alt={`Нам очень жаль что вы не можете увидеть изображение этого красивого места ${placeName}`}
          />
          <figcaption className="popup__caption">{placeName}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ImagePopup;
