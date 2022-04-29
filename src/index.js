import './style.css';
import { savedata, retrivedata } from './modules/localStorage.js';

const entryTask = document.getElementById('newTask');
//const clearBtn = document.querySelector('.clear');


/* Add new value */
entryTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    savedata();
    entryTask.value = null;
    retrivedata();
  }
});



window.addEventListener('load', retrivedata);
