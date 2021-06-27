import React from "react";

const Card = (props) => {

    const handleClick = () => {
    props.onCardClick(props.card);
  };



  return (
    <li key={props.card._id} className="element elements__list-item">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__heading">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-and-count">
          <button
            arial-lable="Поставить/снять лайк на карточке"
            tittle="Поставить/снять лайк"
            type="button"
            className="element__like"
          />
          <p className="element__count">{props.card.likes.length}</p>
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
