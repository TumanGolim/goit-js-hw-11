const apiKey = '40273804-3b8c2dbaae3f52338e7fd3d6d';
const baseUrl = 'https://pixabay.com/api/';

export function fetchImages(query, page, perPage) {
  return fetch(
    `${baseUrl}?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  ).then(response => response.json());
}
