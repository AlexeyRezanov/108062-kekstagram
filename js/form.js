'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.querySelector('#upload-select-image');
var filterImagePreview = document.querySelector('.filter-image-preview');
var uploadFile = document.querySelector('#upload-file');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
var uploadFilterForm = document.querySelector('#upload-filter');
var uploadFilters = uploadFilterForm.elements['upload-filter'];
var selectedFilterClass = 'filter-none';
var buttonInc = uploadFilterForm.querySelector('.upload-resize-controls-button-inc');
var buttonDec = uploadFilterForm.querySelector('.upload-resize-controls-button-dec');
var resizeControlsValue = uploadFilterForm.querySelector('.upload-resize-controls-value');

var DEFAULT_SCALE_VALUE = 100;
var MAX_SCALE = 100;
var MIN_SCALE = 25;
var SCALE_STEP = 25;
var scale = DEFAULT_SCALE_VALUE;

resizeControlsValue.value = DEFAULT_SCALE_VALUE + '%';

uploadFormCancel.addEventListener('click', onClose);
uploadFile.addEventListener('change', onOpen);
buttonInc.addEventListener('click', onIncScale);
buttonDec.addEventListener('click', onDecScale);

for (var i = 0; i < uploadFilters.length; i++) {
  uploadFilters[i].addEventListener('click', onSelectFilter);
}

function resize() {
  resizeControlsValue.value = scale + '%';
  filterImagePreview.style.transform = 'scale(' + scale / 100 + ')';
}

function onSelectFilter(event) {
  var target = event.target;
  filterImagePreview.classList.remove(selectedFilterClass);
  selectedFilterClass = 'filter-' + target.value;
  filterImagePreview.classList.add(selectedFilterClass);
}

function onClose(event) {
  event.preventDefault();
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
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
