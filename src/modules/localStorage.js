const entryTask = document.getElementById('newTask');

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

export function savedata () {
    let taskToDo = JSON.parse(localStorage.getItem('toDoList')) || [];
  if (storageAvailable('localStorage')) {
    const obj = {
      description: `${entryTask.value}`,
      completed: false,
      index: JSON.parse(`${taskToDo.length}`)
    }
    taskToDo.push(obj);
    localStorage.setItem('toDoList', JSON.stringify(taskToDo));
  } else {
    alert('No storage available');
  }
}

export function retrivedata () {
  let taskToDo = JSON.parse(localStorage.getItem('toDoList')) || [];
  let list = document.getElementById('uList');
  document.querySelectorAll('.task-style').forEach(t => t.remove());
    
  for(let tsk of taskToDo) {
    const task = document.createElement('li');
    task.innerHTML = `<span><input type="checkbox" id= "id-${tsk.index}">
    <label for= "id-${tsk.index}">${tsk.description}</label></span>
    <button type="button" class= "menu" id="${tsk.index}">...</button>`;
    task.classList.add('task-style');
    list.appendChild(task);
  };
  
  const menuBtn = document.querySelectorAll('.menu');
  menuBtn.forEach(btn => btn.addEventListener('click', function (e){
    taskToDo.splice(e.this, 1);
    
    for (let i=0; i<taskToDo.length; i+=1) {
      taskToDo[i].index = i;
    }
    localStorage.setItem('toDoList', JSON.stringify(taskToDo));
    retrivedata();
  }));
}
