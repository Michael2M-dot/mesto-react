import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


const EditProfilePopup =(props) => {
	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	useEffect(()=> {
		setName(currentUser.name);
		setDescription(currentUser.about);
	},[currentUser]);

	const handleChangeName = (e) => {
		setName(e.target.value)
	};

	const handleChangeDescription = (e) => {
		setDescription(e.target.value)
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		props.onUpdateUser({
			name,
			about: description
			}
		);
	};

	return (
		<PopupWithForm
			name={"user-profile"}
			title={"Редактировать профиль"}
			button={"Сохранить"}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<Input
				type={"text"}
				value={name}
				id={"user-name"}
				placeholder={"Имя"}
				name={"userNameInput"}
				required={true}
				maxLength={"40"}
				minLength={"2"}
				onChange={handleChangeName}
			/>
			<Input
				type={"text"}
				value={description}
				id={"user-job"}
				placeholder={"О себе"}
				name={"userJobInput"}
				required={true}
				maxLength={"200"}
				minLength={"2"}
				onChange={handleChangeDescription}
			/>
		</PopupWithForm>
	)
}

export default EditProfilePopup;