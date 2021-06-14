import React from "react";


const Card =(card) =>{
	return(
		<li key={card.id} className="element elements__list-item">
			<img src={card.link} alt={card.name} className="element__image" />
			<div className="element__heading">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like-and-count">
					<button
						arial-lable="Поставить/снять лайк на карточке"
						tittle="Поставить/снять лайк"
						type="button"
						className="element__like"
					></button>
					<p className="element__count">{card.likes.length}</p>
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
	)
}

export default Card