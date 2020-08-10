import { findNeedElement } from './workWithBrowser';

export const triggerUploadInput = (id) => {
  findNeedElement(`[name=uploader${id}]`).click();
};

export const uploadFile = (file, updateFileDataFunc) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    updateFileDataFunc(file, reader.result);
  };
};

const preventDefault = (e) => {
  e.preventDefault();
  if (e.currentTarget.classList.contains('fileUploader')) {
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
  } else {
    e.dataTransfer.dropEffect = 'none';
  }
};

export const preventDefaultFaileUpload = () => {
  const body = document.body;
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    body.addEventListener(eventName, preventDefault);
  });
};

export const removePreventDefault = () => {
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefault);
  });
};

export const dragAndDropForFile = (updateFileDataFunc) => {
  const fileUploader = findNeedElement('.fileUploader'),
    uploaderBtn = findNeedElement('.fileUploader button'),
    body = document.body,
    dndText = findNeedElement('.fileUploader__dndText');

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    fileUploader.addEventListener(eventName, preventDefault);
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    fileUploader.addEventListener(eventName, () => {
      fileUploader.style.border = '2px dashed black';
      uploaderBtn.classList.add('hiddenElem');
      dndText.classList.remove('hiddenElem');
    });
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    body.addEventListener(eventName, (e) => {
      uploaderBtn.classList.add('hiddenElem');
      dndText.classList.remove('hiddenElem');
      fileUploader.style.border = '2px dashed black';
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    body.addEventListener(eventName, (e) => {
      uploaderBtn.classList.remove('hiddenElem');
      dndText.classList.add('hiddenElem');
      fileUploader.style.border = 'none';
    });
  });

  fileUploader.addEventListener('drop', (e) => {
    if (!e.dataTransfer.files[0]) {
      uploaderBtn.classList.remove('hiddenElem');
      dndText.classList.add('hiddenElem');
      fileUploader.style.border = 'none';
      return;
    }
    if (updateFileDataFunc) {
      uploadFile(e.dataTransfer.files[0], updateFileDataFunc);
      uploaderBtn.classList.remove('hiddenElem');
      dndText.classList.add('hiddenElem');
      fileUploader.style.border = 'none';
    }
  });
};
