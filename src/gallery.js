export function createPhotoCard(image) {
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';
  img.style.width = '600px';
  img.style.height = '390px';


  return photoCard;
}

export function appendPhotoCardToGallery(photoCard, largeImageURL) {
  const a = document.createElement('a');
  a.href = largeImageURL;
  a.appendChild(photoCard);

  const gallery = document.querySelector('.gallery');
  gallery.appendChild(a);
}
