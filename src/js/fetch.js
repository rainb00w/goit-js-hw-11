
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/?key=26582400-238f4fc38707f184745ce0218&q';
import axios from 'axios';

export default class NewsApiService {
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
      })
      .then(info => {
        // console.log(info.data);
        console.log(info.data.totalHits);
        const totalH = info.data.totalHits;
        this.lastPage = Math.ceil(totalH / 40);
        if (this.page === 1 && info.data.totalHits > 0){
          // console.log(info.data.totalHits, '1 err');
          Notiflix.Notify.success(`Hooray! We found ${totalH} images.`);
  
        }
        // console.log(this.lastPage);

        if (info.data.totalHits === 0) {
          // console.log('2 err');
            throw Error(info.statusText);
        }
        this.incrementPage();
        return info.data.hits;
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
