import { entriesInDB, database } from './firebase.js';
import {
  push,
  onValue,
  get,
  remove,
  ref,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const inputField = selectHtmlElement('[data-id="text-input"]');
const addToCartBtn = selectHtmlElement('[data-id="add-btn"]');
const wrapper = selectHtmlElement('[data-id="task-wrapper"]');

onValue(entriesInDB, function (snapshot) {
  if (snapshot.exists()) {
    emptyList();
    const entries = Object.values(snapshot.val());

    entries.forEach((entry) => addToCartHandler(entry));
  }
});

const addToCartHandler = (entry) => {
  const newTask = createHtmlElement('li');

  newTask.innerText = entry;

  newTask.addEventListener('click', function () {
    removeData(entry);
  });
  wrapper.appendChild(newTask);
};

const removeData = async (entryToDelete) => {
  const snapshot = await get(entriesInDB);
  if (wrapper.childNodes.length === 1) {
    emptyList();
  }
  if (!snapshot.exists()) {
    return;
  }
  const existingEntries = await snapshot.val();
  const keyValues = Object.entries(existingEntries);
  const itemToDelete = keyValues.find((item) => item[1] === entryToDelete);

  const exactPath = ref(database, `entries/${itemToDelete[0]}`);

  if (itemToDelete) {
    remove(exactPath);
  }
};

const addData = async (value) => {
  const snapshot = await get(entriesInDB);
  if (!snapshot.exists()) {
    push(entriesInDB, value.toLowerCase().trim());
    return;
  }
  const entries = await snapshot.val();
  const existingValues = Object.values(entries);
  if (existingValues.find((item) => item === value.toLowerCase().trim())) {
    return;
  }
  push(entriesInDB, value.toLowerCase());
};

addToCartBtn.addEventListener('click', () => {
  if (inputField.value !== '') {
    addData(inputField.value);
    inputField.value = '';
  }
});

function selectHtmlElement(dataId) {
  return document.querySelector(dataId);
}
function createHtmlElement(element) {
  return document.createElement(element);
}

function emptyList() {
  wrapper.replaceChildren();
}
