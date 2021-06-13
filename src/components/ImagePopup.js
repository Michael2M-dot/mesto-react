import React from "react";

const ImagePopup = () => {
	return(
		<section className="popup page__popup section" id="picture-popup">
			<div className="popup__window popup__window_size_l">
				<button
					arial-lable="Закрыть окно просмотра фотографии"
					tittle="Закрыть"
					type="button"
					className="button popup__button-close popup__button-close_pos_inside"
					id="close-PicturePopup"
				></button>
				<figure className="popup__figure">
					<img className="popup__image" src="#" alt="#" />
					<figcaption className="popup__caption"></figcaption>
				</figure>
			</div>
		</section>
	)
};

export default ImagePopup;