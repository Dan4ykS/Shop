export const toggleUploadAvatarMenu = (e, mode) => {
  const parentNode = e.target.closest('.userAvatar'),
    uploadsMenu = parentNode.lastChild;

  if (mode === 'show') {
    uploadsMenu.classList.add('userAvatar__btn_active');
  } else {
    uploadsMenu.classList.remove('userAvatar__btn_active');
  }
};


