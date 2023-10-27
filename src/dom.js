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

export function displayImages(images) {
  const gallery = document.querySelector('.gallery');
  images.forEach(image => {
    const photoCard = `
      <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" style="width: 600px; height: 390px;">
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>`;

    const a = document.createElement('a');
    a.href = image.largeImageURL;
    a.innerHTML = photoCard;

    gallery.appendChild(a);
  });
}
