// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const pictureMarcup = creatingGalleryPictures(galleryItems);
const galleryConteiner = document.querySelector(".gallery");

galleryConteiner.insertAdjacentHTML("beforeend", pictureMarcup);
galleryConteiner.addEventListener("click", onPictureClick);

function creatingGalleryPictures(gallery) {
  const markup = galleryItems
    .map(
      ({ preview, original, description }) =>
        `<a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>`
    )
    .join("");
  return markup;
}

function onPictureClick(evt) {
    evt.preventDefault();
}

new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: "img",
    captionsData: "alt",
    captionDelay: 250,
    widthRatio: 1,
    heightRatio: 1,
});

console.log(galleryItems);
