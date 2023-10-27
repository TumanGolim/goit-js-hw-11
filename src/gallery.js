export function createPhotoCard(image) {
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

  return photoCard;
}

export function appendPhotoCardToGallery(photoCard, largeImageURL) {
  const a = document.createElement('a');
  a.href = largeImageURL;
  a.innerHTML = photoCard;

  const gallery = document.querySelector('.gallery');
  gallery.appendChild(a);
}
