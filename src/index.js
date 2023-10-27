import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './api';
import {
  clearGallery,
  updateLoadMoreBtnVisibility,
  displayNotification,
} from './dom';
import { createPhotoCard, appendPhotoCardToGallery } from './gallery';

const form = document.getElementById('search-form');
const searchInput = form.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a');
let page = 1;
const perPage = 40;
let currentSearchQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();
  currentSearchQuery = searchInput.value;
  clearGallery();
  page = 1;
  const data = await fetchImages(currentSearchQuery, page, perPage);

  if (data.hits.length === 0) {
    displayNotification(
      'failure',
      'Sorry, there are no images matching your search query. Please try again.'
    );
    updateLoadMoreBtnVisibility(false);
  } else {
    displayNotification(
      'success',
      `Hooray! We found ${data.totalHits} images.`
    );
    data.hits.forEach(image => {
      const photoCard = createPhotoCard(image);
      appendPhotoCardToGallery(photoCard, image.largeImageURL);
    });
    page += 1;
    updateLoadMoreBtnVisibility(true);
    lightbox.refresh();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  const data = await fetchImages(currentSearchQuery, page, perPage);
  data.hits.forEach(image => {
    const photoCard = createPhotoCard(image);
    appendPhotoCardToGallery(photoCard, image.largeImageURL);
  });
  page += 1;
  lightbox.refresh();
});
