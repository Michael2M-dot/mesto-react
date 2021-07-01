import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ onCardClick, onCardLike, onCardDelete, card }) => {
  const currentUser = useContext(CurrentUserContext);

  //обработчик слушателя клика полноэкранного просмотра изображения карточки
  const handleClick = () => {
    onCardClick(card);
  };

  //добавляем видимость для лайка, если его установил пользователь и функционал по клику
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  //обработчик слушателя для лайка карточки
  const handleLikeClick = () => {
    onCardLike(card);
  };

  //  добавляем видимость корзины удаления для карточки пользователя и функционал по клику
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `button element__trash ${
    isOwn ? "" : "element__trash_hidden"
  }`;

  //обработчик клика удаления карточки пользователя
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="element elements__list-item">
      <img
        src={card && card.link}
        alt={card && card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__heading">
        <h2 className="element__title">{card && card.name}</h2>
        <div className="element__like-and-count">
          <button
            arial-lable="Поставить/снять лайк на карточке"
            tittle="Поставить/снять лайк"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__count">
            {card.likes ? card.likes.length : "0"}
          </p>
        </div>
      </div>
      <button
        arial-lable="Удалить карточку со страницы"
        tittle="Удалить"
        type="button"
        className={cardDeleteButtonClassName}
        id="delete-Btn"
        onClick={handleDeleteClick}
      />
    </li>
  );
};

export default Card;
