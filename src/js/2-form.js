const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
const formObject = {};
//функція для загрузки даних
function loadFormData() {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      form.elements.email.value = parsedData.email;
      form.elements.message.value = parsedData.message;
      Object.assign(formObject, parsedData);
    }
  }
}
// функція для зберігання даних в локалсторж
function saveFormData() {
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    formObject[key] = value.trim();
  });
  localStorage.setItem(localStorageKey, JSON.stringify(formObject));
}
// функція збросу даних локалсторж
function resetForm() {
  form.reset();
  localStorage.removeItem(localStorageKey);
}
// слухач події відправки форми
form.addEventListener('input', () => {
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    formObject[key] = value.trim();
  });
  localStorage.setItem(localStorageKey, JSON.stringify(formObject));
});

// слухач події при ведденні даних(чи заповнені всі поля чи ні )
form.addEventListener('submit', event => {
  event.preventDefault();

  const email = event.currentTarget.elements.email.value.trim();
  const message = event.currentTarget.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('fill in all');
  } else {
    console.log(formObject);
    resetForm();
  }
});
loadFormData();
