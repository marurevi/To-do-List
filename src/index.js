import './style.css';
import { savedata, retrivedata } from './modules/localStorage.js';

const entryTask = document.getElementById('newTask');
const clearBtn = document.querySelector('.clear');
const listOnStorage = JSON.parse(localStorage.getItem('toDoList')) || [];

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
  localStorage.setItem('toDoList', JSON.stringify(listOnStorage.filter((item) => item.completed === true)));
  retrivedata();
});

window.addEventListener('load', retrivedata);
