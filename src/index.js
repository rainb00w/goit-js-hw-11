import './sass/main.scss';
import Notiflix from 'notiflix';
import NewsApiService from '../src/js/fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  galleryDiv: document.querySelector('.gallery'),
  loadMoreBTN: document.querySelector('.load-more'),
  endtxt: document.querySelector('.endText'),
  errorText: 'Sorry, there are no images matching your search query. Please try again.',
};

const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBTN.addEventListener('click', onLoadMore);

let lightbox = new SimpleLightbox({elements: '.gallery a'});

// console.log(refs.loadMoreBTN);
// refs.loadMoreBTN.setAttribute('disabled', '');

function onFormSubmit(event) {
  event.preventDefault();
  refs.loadMoreBTN.classList.add('is-hidden');
  refs.endtxt.classList.add('is-hidden');
  refs.galleryDiv.innerHTML = '';
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  if (newsApiService.query === '') {
    return alert('Plese, enter some data');
  }
  newsApiService.resetPage();
  newsApiService.resetLastPage();
  newsApiService
    .fetchArticles()
    .then(renderPosts)
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(refs.errorText);
      return;
    });
}

function onLoadMore() {
  newsApiService
    .fetchArticles()
    .then(renderPosts)
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(refs.errorText);
    });
}

function renderPosts(posts) {
  const markup = posts
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
      <div class="photo-card">
        <div class="gallery__item">
        <a class="gallery__item" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
        </a>
        </div>
        
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments} </b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads} </b>
          </p>
        </div>
      </div>`;
    })
    .join('');

  refs.loadMoreBTN.classList.remove('is-hidden');

  if (newsApiService.lastPage === newsApiService.page - 1) {
    refs.endtxt.classList.remove('is-hidden');
    refs.loadMoreBTN.classList.add('is-hidden');
  }

  refs.galleryDiv.insertAdjacentHTML('beforeend', markup);
}



