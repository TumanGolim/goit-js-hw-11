import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const searchInput = form.querySelector('input[name="searchQuery"]');

const apiKey = '40273804-3b8c2dbaae3f52338e7fd3d6d';
const baseUrl = 'https://pixabay.com/api/';
let page = 1;
const perPage = 40;

let currentSearchQuery = '';

const lightbox = new SimpleLightbox('.gallery a');

function fetchImages(query, resetGallery = false) {
  if (resetGallery) {
    gallery.innerHTML = '';
    lightbox.refresh();
    page = 1;
  }

  fetch(
    `${baseUrl}?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  )
    .then(response => response.json())
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMoreBtn.style.display = 'none';
      } else {
        if (resetGallery) {
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }

        data.hits.forEach(image => {
          const photoCard = document.createElement('div');
          photoCard.classList.add('photo-card');

          const img = document.createElement('img');
          img.src = image.webformatURL;
          img.alt = image.tags;
          img.loading = 'lazy';

          img.style.width = '600px';
          img.style.height = '390px';

          const info = document.createElement('div');
          info.classList.add('info');

          const likes = document.createElement('p');
          likes.classList.add('info-item');
          likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

          const views = document.createElement('p');
          views.classList.add('info-item');
          views.innerHTML = `<b>Views:</b> ${image.views}`;

          const comments = document.createElement('p');
          comments.classList.add('info-item');
          comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

          const downloads = document.createElement('p');
          downloads.classList.add('info-item');
          downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

          info.appendChild(likes);
          info.appendChild(views);
          info.appendChild(comments);
          info.appendChild(downloads);

          photoCard.appendChild(img);
          photoCard.appendChild(info);

          const a = document.createElement('a');
          a.href = image.largeImageURL;
          a.appendChild(photoCard);

          gallery.appendChild(a);
        });

        page += 1;
        loadMoreBtn.style.display = 'block';
        lightbox.refresh();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  currentSearchQuery = searchInput.value;
  fetchImages(currentSearchQuery, true);
});

loadMoreBtn.addEventListener('click', () => {
  fetchImages(currentSearchQuery);
});
