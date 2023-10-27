import Notiflix from 'notiflix';

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function updateLoadMoreBtnVisibility(shouldDisplay) {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.style.display = shouldDisplay ? 'block' : 'none';
}

export function displayNotification(type, message) {
  const notification = Notiflix.Notify[type](message);
  return notification;
}
