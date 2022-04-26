import _ from 'lodash';
import './style.css';
// Lodash, now imported by this script

const list = document.getElementById('uList');
const entryTask = document.getElementById('newTask');

let taskToDo = [];

function storageAvailable(type) {
  try {
    var storage = window[type],
        x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
    // everything except Firefox
    e.code === 22 ||
    // Firefox
    e.code === 1014 ||
    // test name field too, because code might not be present
    // everything except Firefox
    e.name === 'QuotaExceededError' ||
    // Firefox
    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
    // acknowledge QuotaExceededError only if there's something already stored
    storage.length !== 0;
  }
}

function savedata () {
  if (storageAvailable('localStorage')) {
    const obj = {
      description: `${entryTask.value}`,
      completed: 'false',
      index: 'taskToDo.length+1'
    }
    entryTask.value = '';
    taskToDo.push(obj);
    localStorage.setItem('toDoList', JSON.stringify(taskToDo));
  } else {
    alert('No storage available');
  }
}

function retrivedata () {
  taskToDo = JSON.parse(localStorage.getItem('toDoList'));
  if (taskToDo!==0) {
    for(let tsk of taskToDo) {
      const task = document.createElement('li');
      
      task.innerHTML = `<input type="checkbox" id= "${tsk.index}"><label for= "${tsk.index}">${tsk.description}</label>`;
      task.classList.add('task-style');
      list.appendChild(task);
    }
  }
}

entryTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    savedata();
  }
});

retrivedata();

//window.addEventListener('load', retrivedata);
