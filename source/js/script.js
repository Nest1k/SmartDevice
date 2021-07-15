'use strict';

(function () {

  const footerFirstParts = document.querySelector('.footer__parts-site');
  const footerFirstContacts = document.querySelector('.footer__contact-site');
  const overlay = document.querySelector('.bg-overlay');
  const button = document.querySelector('.header__rqst-link');
  const modal = document.querySelector('.modal--call');
  const buttonClose = modal.querySelector('.modal__button-close');
  const inputName = modal.querySelector('input[type=text]');
  const body = document.querySelector('.page-body');


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

window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.tel'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});

});
