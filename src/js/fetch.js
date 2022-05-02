
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/?key=26582400-238f4fc38707f184745ce0218&q';
import axios from 'axios';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.lastPage = 1;
  }

  "Hooray! We found totalHits images."

 async fetchArticles() {
    // console.log(this);
    const url = `${BASE_URL}=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return await axios.get(url)
      .then(res => {
        if (!(res.status >= 200 && res.status < 300)) {
          // console.log('1 err');
          throw Error(res.statusText);
        }
        return res;
      });
  }

  incrementPage(){
      this.page += 1; 
  }

  resetLastPage() {
    this.lastPage = 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
