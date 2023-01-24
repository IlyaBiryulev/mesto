import { nameInput,
  jobInput,
  cardsSelector
} from "./constants.js";

import { createCard, popupOpenImg } from "../pages/index.js";

export const handleProfileFormSubstitution = (userData) => {
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

export const handleAddCardForm = (popupInputsValue) => {
  cardsSelector.prepend(createCard(popupInputsValue))
}

export const handleCardClick = (name, link) => {
  popupOpenImg.open(name, link);
}
