import './style.css';
import { savedata, retrivedata } from './modules/localStorage.js';

const entryTask = document.getElementById('newTask');
const clearBtn = document.querySelector('.clear');
let listOnStorage = JSON.parse(localStorage.getItem('toDoList')) || [];

/* Add new value */
entryTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    savedata();
    entryTask.value = null;
    retrivedata();
  }
});

/* Erase all completed task --fix (erase all list) */
clearBtn.addEventListener('click', () => {
  listOnStorage = [];
  localStorage.setItem('toDoList', JSON.stringify(listOnStorage));
  retrivedata();
});

window.addEventListener('load', retrivedata);
