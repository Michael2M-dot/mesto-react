import React, {useContext} from "react";
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {

    const card = useContext(CardContext);
    const currentUser = useContext(CurrentUserContext);

    const handleClick = () => {
    props.onCardClick(card);
  };

    //добавляем видимость для лайка, если его установил пользователь и функционал по клику
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName =(`element__like ${isLiked ? 'element__like_active' : ''}`)

    const handleLikeClick = () => {
        props.onCardLike(card);
    }

  //  добавляем видимость корзины удаления для карточки пользователя и функционал по клику
    const isOwn = card.owner._id ===currentUser._id;

    const cardDeleteButtonClassName =(`button element__trash ${isOwn ? '' : 'element__trash_hidden'}`)

    const handleDeleteClickClick = () => {
        props.onCardDelete(card);
    }


  return (
    <li key={card._id} className="element elements__list-item">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__heading">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-and-count">
          <button
            arial-lable="Поставить/снять лайк на карточке"
            tittle="Поставить/снять лайк"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__count">{card.likes.length}</p>
        </div>
      </div>
      <button
        arial-lable="Удалить карточку со страницы"
        tittle="Удалить"
        type="button"
        className={cardDeleteButtonClassName}
        id="delete-Btn"
        onClick={handleDeleteClickClick}
      />
    </li>
  );
}


export default Card;
