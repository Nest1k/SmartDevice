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

window.addEventListener('DOMContentLoaded', function() {

  var inputs = document.querySelectorAll('input[type="tel"]');

  Array.prototype.forEach.call(inputs, function(input) {
    new InputMask({
      selector: input,
      layout: input.dataset.mask
    })
  })

})

function InputMask(options) {
  this.el = this.getElement(options.selector);
  if (!this.el) return console.log('Что-то не так с селектором');
  this.layout = options.layout || '+7 (___) ___-__-__';
  this.maskreg = this.getRegexp();
  this.setListeners();
}

InputMask.prototype.getRegexp = function () {
  var str = this.layout.replace(/_/g, '\\d');
  str = str.replace(/\(/g, '\\(');
  str = str.replace(/\)/g, '\\)');
  str = str.replace(/\+/g, '\\+');
  str = str.replace(/\s/g, '\\s');
  return str;
};

InputMask.prototype.mask = function (e) {
  var _this = e.target,
      matrix = this.layout,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = _this.value.replace(/\D/g, "");

  if (def.length >= val.length) val = def;
  _this.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
  });

  if (e.type == "blur") {
    var regexp = new RegExp(this.maskreg);
    if (!regexp.test(_this.value)) _this.value = "";
  } else {
    this.setCursorPosition(_this.value.length, _this);
  }
};

InputMask.prototype.setCursorPosition = function (pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);else if (elem.createTextRange) {
    var range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
};

InputMask.prototype.setListeners = function () {
  this.el.addEventListener("input", this.mask.bind(this), false);
  this.el.addEventListener("focus", this.mask.bind(this), false);
  this.el.addEventListener("blur", this.mask.bind(this), false);
};

InputMask.prototype.getElement = function (selector) {
  if (selector === undefined) return false;
  if (this.isElement(selector)) return selector;

  if (typeof selector == 'string') {
    var el = document.querySelector(selector);
    if (this.isElement(el)) return el;
  }

  return false;
};

InputMask.prototype.isElement = function (element) {
  return element instanceof Element || element instanceof HTMLDocument;
};
