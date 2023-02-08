import './index.css';

import Api from '../components/Api.js';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import PopupWithConfirm from '../components/PopupWithConfirm.js';

import {
  profilePopupSelector,
  popupAddElementSelector,
  popupImgElementSelector,
  profileForm,
  popupUpdateAvatarSelector,
  popupDeleteConfirmSelector,
  formAddElement,
  avatarForm,
  profileEditButton,
  profileAddButton,
  cardsContainer,
  cadrsTemplate,
  config,
  profileAvatarUpdateButton
} from "../utils/constants.js";

import { handleAddCardForm,
  handleProfileFormSubstitution,
  handleUpdateAvatarForm
 } from '../utils/utils.js';
//--------------------------------------------------------------------------------------------
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '34b33043-5140-4391-8d43-660bc14ee8a8',
    'Content-Type': 'application/json'
  }
});

export const createCard = (item) => {
  const card = new Card(
    item,
    cadrsTemplate,
    userInfo.getUserId(),
    {handleCardClick: (name, link) => {
      popupOpenImg.open(name, link);
    },
    handleCardDelete: (id) => {
      popupWithConfirm.open()
      popupWithConfirm.handleFormSubmit(() => {
        api.deleteCard(id)
        .then(() => {
          card.deleteCard();
          popupWithConfirm.close()
        })
        .catch((err) => {
          console.log(err);
        })
      })
    },
    handleLikeClick: (id) => {
      if(card.isLiked) {
        api.deleteCardLike(id)
        .then((data) => {
          card.dislikeCardLikeButton()
          card.handleCardLikeCounter(data.likes)
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        api.putCardLike(id)
        .then((data) => {
          card.putCardLikeButton()
          card.handleCardLikeCounter(data.likes)
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
    })
  const cardElement = card.generateCard();
  return cardElement
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, cardsContainer)

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((res) => {
  userInfo.setUserInfo(res[0].name, res[0].about, res[0]._id);
  userInfo.setUserAvatar(res[0].avatar);
  cardList.renderItems(res[1]);
})
.catch((err) => {
  console.log(err);
});

const userInfo = new UserInfo(
  {
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__about-me',
    profileAvatarSelector: '.profile__image'
  }
)

const popupUpdateAvatarForm = new PopupWithForm({
  handleFormSubmit: (popupInputsValue) => {
    popupUpdateAvatarForm.rendererLoading(true)
    api.updateAvatar(popupInputsValue)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupUpdateAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupUpdateAvatarForm.rendererLoading(false)
    })
  }
}, popupUpdateAvatarSelector)
popupUpdateAvatarForm.setEventListeners()

profileAvatarUpdateButton.addEventListener('click', () => {
  const userData = userInfo.getUserAvatar()
  console.log(userData)
  handleUpdateAvatarForm(userData)
  avatarFormValidator.resetValidation();
  popupUpdateAvatarForm.open()
});

const popupEditForm = new PopupWithForm({
  handleFormSubmit: (popupInputsValue) => {
    popupEditForm.rendererLoading(true)
    api.editProfile(popupInputsValue)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.rendererLoading(false)
    })
    /*userInfo.setUserInfo(popupInputsValue.name, popupInputsValue.job);
    popupEditForm.close();*/
  }
}, profilePopupSelector)
popupEditForm.setEventListeners()

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()
  handleProfileFormSubstitution(userData)
  profileFormValidator.resetValidation();
  popupEditForm.open()
});

const popupAddForm = new PopupWithForm({
  handleFormSubmit: (popupInputsValue) => {
    popupAddForm.rendererLoading(true)
    api.addCard(popupInputsValue)
    .then((res) => {
      handleAddCardForm(res);
       popupAddForm.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddForm.rendererLoading(false)
    })
  }
}, popupAddElementSelector)
popupAddForm.setEventListeners()



profileAddButton.addEventListener('click', () => {
  formAddValidator.resetValidation();
  popupAddForm.open()
});
//--------------------------------------------------------------------------------------------
//FUNC FOR OPENED IMG POPUP
export const popupOpenImg = new PopupWithImage(popupImgElementSelector);
popupOpenImg.setEventListeners();

const popupWithConfirm = new PopupWithConfirm(popupDeleteConfirmSelector);
popupWithConfirm.setEventListeners();
//--------------------------------------------------------------------------------------------

const beginValidation = (formSelector) => {
  const validator = new FormValidator(config, formSelector);
  return validator
}

const profileFormValidator = beginValidation(profileForm);
profileFormValidator.enableValidation(profileForm);

const formAddValidator = beginValidation(formAddElement);
formAddValidator.enableValidation(formAddElement)

const avatarFormValidator = beginValidation(avatarForm);
avatarFormValidator.enableValidation(avatarForm)

