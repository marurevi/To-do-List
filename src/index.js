import './style.css';
import { savedata, retrivedata } from './modules/localStorage';

const entryTask = document.getElementById('newTask');

entryTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    savedata();
    retrivedata();
  }
});

window.addEventListener('load', retrivedata);

