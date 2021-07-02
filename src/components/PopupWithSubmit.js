import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupWithSubmit = ({
  isOpen,
  onClose,
  deleteCard,
  isSubmitted,
  data,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitted) {
      return;
    }

    deleteCard(data);
  };

  return (
    <PopupWithForm
      name={"user-submit"}
      title={"Вы уверены?"}
      button={!isSubmitted ? "Да" : "Удаление"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      idSubmitted={isSubmitted}
    />
  );
};

export default PopupWithSubmit;
