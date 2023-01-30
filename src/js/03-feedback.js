import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const { feedbackForm, input, textarea } = refs;

const LOCALSTORAGE_KEY = 'feedback-form-state';

initForm();

feedbackForm.addEventListener('input', throttle(onFeedbackFormInput, 500));

feedbackForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(feedbackForm);
  formData[evt.target.name] = evt.target.value;
  formData.forEach((name, value) => console.log(name, value));
  input.value = '';
  textarea.value = '';
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

function onFeedbackFormInput(evt) {
  let currentForm = localStorage.getItem(LOCALSTORAGE_KEY);
  currentForm = currentForm ? JSON.parse(currentForm) : {};
  currentForm[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(currentForm));
}

function initForm() {
  let currentForm = localStorage.getItem(LOCALSTORAGE_KEY);
  if (currentForm) {
    currentForm = JSON.parse(currentForm);
    Object.entries(currentForm).forEach(([name, value]) => {
      feedbackForm.elements[name].value = value;
    });
  }
}
