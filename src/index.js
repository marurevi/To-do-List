import './style.css';
import { savedata, retrivedata } from './modules/localStorage.js';

const entryTask = document.getElementById('newTask');
const clearBtn = document.querySelector('.clear');
let taskToDo = JSON.parse(localStorage.getItem('toDoList')) || [];

entryTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    savedata();
    entryTask.value = null;
    retrivedata();
  }
});

clearBtn.addEventListener('click', () => {
  taskToDo = [];
  localStorage.setItem('toDoList', JSON.stringify(taskToDo));
  retrivedata();
});

window.addEventListener('load', retrivedata);
