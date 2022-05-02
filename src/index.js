import './sass/main.scss';
import Notiflix from 'notiflix';
import ImageApiService from '../src/js/fetch';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  galleryDiv: document.querySelector('.gallery'),
  loadMoreBTN: document.querySelector('.load-more'),
  endtxt: document.querySelector('.endText'),
  errorText: 'Sorry, there are no images matching your search query. Please try again.',
};

const imageApiService = new ImageApiService();




refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBTN.addEventListener('click', onLoadMore);

// console.log(SimpleLightbox);

function onFormSubmit(event) {
  event.preventDefault();
  refs.loadMoreBTN.classList.add('is-hidden');
  refs.endtxt.classList.add('is-hidden');
  refs.galleryDiv.innerHTML = '';
  imageApiService.query = event.currentTarget.elements.searchQuery.value;
  if (imageApiService.query === '') {
    return alert('Plese, enter some data');
  }
  imageApiService.resetPage();
  imageApiService.resetLastPage();
  imageApiService
    .fetchArticles()
    .then(Notifications)
    .then(renderPosts)
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(refs.errorText);
      return;
    });
}

function Notifications(info) {
  console.log(info.data);
  console.log(info.data.totalHits);
  const totalH = info.data.totalHits;
  imageApiService.lastPage = Math.ceil(totalH / 40);
  if (imageApiService.page === 1 && info.data.totalHits > 0) {
    // console.log(info.data.totalHits, '1 err');
    Notiflix.Notify.success(`Hooray! We found ${totalH} images.`);
  }
  // console.log(this.lastPage);

  if (info.data.totalHits === 0) {
    // console.log('2 err');
    throw Error(info.statusText);
  }
  imageApiService.incrementPage();
  return info.data.hits;
}

function onLoadMore() {
  imageApiService
    .fetchArticles()
    .then(Notifications)
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
      <div class="gallery__container">
      <a class="gallery__item" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
      </a>
      </div>
       
  <ul class="info-list">
    <li class="info-li">
      <p class="info-item">
        <b>Likes <br /></b>
        ${likes}
      </p>
    </li>
    <li class="info-li">
      <p class="info-item">
        <b>Views <br /></b>
        ${views}
      </p>
    </li>
    <li class="info-li">
      <p class="info-item">
        <b
          >Comments <br />
        </b>
        ${comments}
      </p>
    </li>
    <li class="info-li">
      <p class="info-item">
        <b
          >Downloads <br />
        </b>   
        ${downloads}
      </p>
    </li>
  </ul>
      </div>`;
    })
    .join('');

  refs.loadMoreBTN.classList.remove('is-hidden');


  if (imageApiService.lastPage === imageApiService.page - 1) {
    refs.endtxt.classList.remove('is-hidden');
    refs.loadMoreBTN.classList.add('is-hidden');
  }

  refs.galleryDiv.insertAdjacentHTML('beforeend', markup);

  let gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
}




