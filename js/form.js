'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.querySelector('#upload-select-image');
var filterImagePreview = document.querySelector('.filter-image-preview');
var uploadFile = document.querySelector('#upload-file');
var buttonClose = document.querySelector('.upload-form-cancel');
var uploadFilterForm = document.querySelector('#upload-filter');
var selectedFilterClass = 'filter-none';
var buttonInc = uploadFilterForm.querySelector('.upload-resize-controls-button-inc');
var buttonDec = uploadFilterForm.querySelector('.upload-resize-controls-button-dec');
var resizeControlsValue = uploadFilterForm.querySelector('.upload-resize-controls-value');
var filterDiv = uploadFilterForm.querySelector('.upload-filter-controls');

var DEFAULT_SCALE_VALUE = 100;
var MAX_SCALE = 100;
var MIN_SCALE = 25;
var SCALE_STEP = 25;
var scale = DEFAULT_SCALE_VALUE;

var ESCAPE_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

resizeControlsValue.value = DEFAULT_SCALE_VALUE + '%';

filterDiv.addEventListener('click', onSelectFilter);
filterDiv.addEventListener('keydown', onSelectFilterByEnter);
buttonClose.addEventListener('click', onClose);
uploadFile.addEventListener('change', onOpen);
buttonInc.addEventListener('click', onIncScale);
buttonDec.addEventListener('click', onDecScale);
uploadOverlay.addEventListener('keydown', onCloseEsc);

function resize() {
  resizeControlsValue.value = scale + '%';
  filterImagePreview.style.transform = 'scale(' + scale / 100 + ')';
}

function close() {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
}

function selectFilter(element) {
  filterImagePreview.classList.remove(selectedFilterClass);
  selectedFilterClass = 'filter-' + element.value;
  filterImagePreview.classList.add(selectedFilterClass);
}

function onSelectFilter(event) {
  var target = event.target;

  if (target.name !== 'upload-filter') {
    return;
  }

  selectFilter(target);
}

function onSelectFilterByEnter(event) {
  if (event.keyCode !== ENTER_KEY_CODE) {
    return;
  }

  var target = event.target;
  var parent = target.parentNode;
  var filter = parent.previousElementSibling;

  if (filter.name !== 'upload-filter') {
    return;
  }

  selectFilter(filter);
  filter.checked = true;
}

function onCloseEsc(event) {
  if (event.keyCode === ESCAPE_KEY_CODE) {
    close();
  }
}

function onClose(event) {
  event.preventDefault();
  close();
}

function onOpen() {
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
}

function onIncScale() {
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP;
  }

  if (scale > MAX_SCALE) {
    scale = MAX_SCALE;
  }

  resize();
}

function onDecScale() {
  if (scale > MIN_SCALE) {
    scale -= SCALE_STEP;
  }

  if (scale < MIN_SCALE) {
    scale = MIN_SCALE;
  }

  resize();
}
