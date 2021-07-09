'use strict';

(function () {

  const footerFirstParts = document.querySelector('.footer__parts-site');
  const footerFirstContacts = document.querySelector('.footer__contact-site');
  const overlay = document.querySelector('.bg-overlay');
  const button = document.querySelector('.header__rqst-link');
  const modal = document.querySelector('.modal--call');
  const buttonClose = modal.querySelector('.modal__button-close');
  const inputName = modal.querySelector('input[type=text]');
  const body = document.querySelector('.page__body');


  const onClickMainFooterFirstParts = function () {

    const closeBlock = footerFirstParts.classList.contains('footer__parts-site--closed');
    toggleAccordeon(footerFirstParts, 'footer__parts-site', closeBlock);

    if (!footerFirstContacts.classList.contains('footer__contact-site--closed')) {
      toggleAccordeon(footerFirstContacts, 'footer__contact-site', false);
    }
  };

  const onClickMainFooterFirstContacts = function () {

    const closeBlock = footerFirstContacts.classList.contains('footer__contact-site--closed');
    toggleAccordeon(footerFirstContacts, 'footer__contact-site', closeBlock);
    if (!footerFirstParts.classList.contains('footer__parts-site--closed')) {
      toggleAccordeon(footerFirstParts, 'footer__parts-site', false);
    }
  };

  const toggleAccordeon = function (block, nameClass, closeBlock) {
    if (closeBlock) {
      block.classList.remove(nameClass + '--closed');
    } else {
      block.classList.add(nameClass + '--closed');
    }
  };

  if (footerFirstParts) {
    footerFirstParts.classList.add('footer__parts-site--closed');
    footerFirstParts.addEventListener('click', onClickMainFooterFirstParts);
  }
  if (footerFirstContacts) {
    footerFirstContacts.classList.add('footer__contact-site--closed');
    footerFirstContacts.addEventListener('click', onClickMainFooterFirstContacts);
  }

if (button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    overlay.classList.remove('visually-hidden');
    modal.classList.remove('visually-hidden');
    modal.classList.add("modal-show-x");
    body.classList.add("body--overflow-hidden")
    inputName.focus();
    eventclose();
  });
}

function eventclose() {
  window.addEventListener('keydown', onEscKeydown);
  overlay.addEventListener('click', onOverlayClick);
  buttonClose.addEventListener('click', removeModal);
}

function onOverlayClick() {
  removeModal();
}

function onEscKeydown(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    removeModal();
  }
}

function removeModal() {
  overlay.classList.add('visually-hidden');
  modal.classList.add('visually-hidden');
  modal.classList.remove("modal-show-x");
  body.classList.remove("body--overflow-hidden")
  window.removeEventListener('keydown', onEscKeydown);
  overlay.removeEventListener('click', onOverlayClick);
}

})();
