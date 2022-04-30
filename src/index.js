import './style.css';
import { savedata, retrivedata } from './modules/localStorage.js';

const entryTask = document.getElementById('newTask');
const clearBtn = document.querySelector('.clear');

/* Add new value */
entryTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    savedata();
    entryTask.value = null;
    retrivedata();
  }
});

/* Erase all completed task */
clearBtn.addEventListener('click', () => {
  const listOnStorage = JSON.parse(localStorage.getItem('toDoList'));
  const filterListOnStorage = listOnStorage.filter((item) => !item.completed);
  for (let i = 1; i < filterListOnStorage.length + 1; i += 1) {
    filterListOnStorage[i - 1].index = i;
  }
  localStorage.setItem('toDoList', JSON.stringify(filterListOnStorage));
  retrivedata();
});

window.addEventListener('load', retrivedata);
