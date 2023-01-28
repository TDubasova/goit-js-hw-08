// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const pictureMarcup = creatingGalleryPictures(galleryItems);
const galleryConteiner = document.querySelector(".gallery");
galleryConteiner.insertAdjacentHTML("beforeend", pictureMarcup);

// Відкриття модального вікна по кліку на елементі галереї та закриття по натисканню Escape
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

    const picture = evt.target.classList.contains("gallery__image");
    if (!picture) {
        return;
    }
}

new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: "img",
    captionsData: "alt",
    captionDelay: 250,
});

console.log(galleryItems);
