


function renderGallery (arrayOfImages) {
    const markUp = arrayOfImages.map(
        ({preview, original, description}) => 
        `<div class="gallery__item">
        <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
        </div>`
        ).join('');

    imageContainer.insertAdjacentHTML('beforeend', markUp);
};


{/* <div class="gallery">
  <a href="images/image1.jpg"><img src="images/thumbs/thumb1.jpg" alt="" title=""/></a>
    <a href="images/image2.jpg"><img src="images/thumbs/thumb2.jpg" alt="" title="Beautiful Image"/></a>
</div>


   <div class="gallery__item">
        <a class="gallery__item" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
      </a>
        </div> */}