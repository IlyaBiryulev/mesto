import { nameInput,
  jobInput,
  cardsSelector,
  avatarLinkInput
} from "./constants.js";

import { createCard, popupOpenImg } from "../pages/index.js";

export const handleProfileFormSubstitution = (userData) => {
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

export const handleUpdateAvatarForm = (userData) => {
  avatarLinkInput.value = userData.avatar;
}

export const handleAddCardForm = (popupInputsValue) => {
  cardsSelector.prepend(createCard(popupInputsValue))
}
