import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

let currentForm;

initForm();

feedbackForm.addEventListener('input', throttle(onFeedbackFormInput, 500));

feedbackForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const localStorageString = localStorage.getItem(LOCALSTORAGE_KEY);
  const localStorageObject = JSON.parse(localStorageString);
  console.log(localStorageObject);

  feedbackForm.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

function onFeedbackFormInput(evt) {
  currentForm = localStorage.getItem(LOCALSTORAGE_KEY);
  currentForm = currentForm ? JSON.parse(currentForm) : {};
  currentForm[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(currentForm));
}

function initForm() {
  currentForm = localStorage.getItem(LOCALSTORAGE_KEY);
  if (currentForm) {
    currentForm = JSON.parse(currentForm);
    Object.entries(currentForm).forEach(([name, value]) => {
      feedbackForm.elements[name].value = value;
    });
  }
}
