import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  userAvatarRef,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: userAvatarRef.current.value,
    });

    userAvatarRef.current.value = "";
  };

  return (
    <PopupWithForm
      name={"user-avatar"}
      title={"Обновить аватар"}
      button={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__fieldset" htmlFor="avatar-link-input">
        <input
          ref={userAvatarRef}
          type="url"
          className="form__input"
          id="avatar-link-input"
          name="avatarLinkInput"
          placeholder="Ссылка на изображение (обязательно)"
          required
        />
        <span className="form__input-error" id="avatar-link-input-error" />
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
  );
};

export default EditAvatarPopup;
