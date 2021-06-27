import React, {useContext} from "react";
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {

    const card = useContext(CardContext);
    const currentUser = useContext(CurrentUserContext);

    const handleClick = () => {
    props.onCardClick(card);
  };

    const handleLikeClick = () => {
        props.onCardLike(card);
    }

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName =(`element__like ${isLiked ? 'element__like_active' : ''}`)

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
        className="button element__trash element__trash_hidden"
        id="delete-Btn"
      />
    </li>
  );
}


export default Card;
