import React, { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";


const EditAvatarPopup = (props) => {

	// const [userAvatar, setUserAvatar] = useState('');
	const userAvatarRef = useRef();

	console.log(userAvatarRef)
	const handleAvatarChange = (e) => {
		userAvatarRef.current(e.target.value)
		console.log(userAvatarRef.current)
	}

	function handleSubmit(e) {
		e.preventDefault();

		props.onUpdateAvatar({
			avatar: userAvatarRef
		});
	}

	return(
		<PopupWithForm
			name={"user-avatar"}
			title={"Обновить аватар"}
			button={"Сохранить"}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className="form__fieldset" htmlFor="avatar-link-input">
				<input
					current={userAvatarRef}
					type="url"
					className="form__input"
					id="avatar-link-input"
					name="avatarLinkInput"
					placeholder="Ссылка на изображение (обязательно)"
					required
					onChange={handleAvatarChange}
				/>
				<span className="form__input-error" id={`${props.id}-input-error`} />
			</label>
			{/*<Input*/}
			{/*	current={userAvatar}*/}
			{/*	type={"url"}*/}
			{/*	id={"avatar-link"}*/}
			{/*	placeholder={"Ссылка на изображение (обязательно)"}*/}
			{/*	name={"avatarLinkInput"}*/}
			{/*	required={true}*/}
			{/*	maxLength={""}*/}
			{/*	minLength={""}*/}
			{/*/>*/}
		</PopupWithForm>
	)
};

export default EditAvatarPopup;