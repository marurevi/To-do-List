import './style.css';

// Lodash, now imported by this script

const list = document.getElementById('uList');
// const entryTask = document.getElementById('newTask');

const taskToDo = [
  {
    description: 'Wash the dishes',
    completed: 'false',
    index: 0,
  },
  {
    description: 'clean the house',
    completed: 'false',
    index: 1,
  },
  {
    description: 'go to the supermarket',
    completed: 'false',
    index: 2,
  },
];

const showList = () => {
  taskToDo.forEach((tsk) => {
    const task = document.createElement('li');

    task.innerHTML = `<span><input type="checkbox" id= "${tsk.index}"><label for= "${tsk.index}">${tsk.description}</label></span><i class="fas fa-ellipsis-v"></i>`;
    task.classList.add('task-style');
    list.appendChild(task);
  });
};

showList();

/*
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
      index: `${taskToDo.length}`
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
  if (taskToDo !== 0) {
    for(let tsk of taskToDo) {
      const task = document.createElement('li');

      task.innerHTML = `<input type="checkbox" id= "${tsk.index}">
      <label for= "${tsk.index}">${tsk.description}</label>`;
      task.classList.add('task-style');
      list.appendChild(task);
    };
  };
}

entryTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    savedata();
    retrivedata();
  }
});

window.addEventListener('load', retrivedata);
*/
