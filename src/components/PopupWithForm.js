import React from "react";
//user = user-profile
//avatar = user-avatar
//card = user-card

function PopupWithForm(props){
		return (
			<section
				className={`popup page__popup section ${props.isOpen ? 'page__popup_visible' : ''}`}
				id={`edit-${props.name}`}
				onClick={props.onClose}
				onKeyDown={props.onClose}
			>
				<div className="popup__window popup__window_size_s">
					<h2 className="popup__title">{props.title}</h2>
					<button
						arial-lable="Закрыть форму для изменения данных о пользователе"
						tittle="Закрыть"
						type="button"
						className="button popup__button-close"
						id="close-userPopup"
					></button>
					<form
						className="form"
						id={`${props.name}`}
						name="userProfileForm"
						autoComplete="off"
						noValidate
					>
						{props.children}
						<button
							arial-lable="Сохранить изменения данных о пользователе"
							type="submit"
							className="button form__submit-btn"
							id="user-submit"
						>
							<div className="button__wrapper">
								<div className="button__text">{props.button}</div>
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
		)
}

export default PopupWithForm;


// <section className={`popup page__popup section ${props.isOpen ? 'page__popup_visible' : ''}`} id={`edit-${props.name}`}>