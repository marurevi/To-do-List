const entryTask = document.getElementById('newTask');

const storageAvailable = (type) => {
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

export const savedata = () => {
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

export const retrivedata = () => {
  let taskToDo = JSON.parse(localStorage.getItem('toDoList')) || [];
  let list = document.getElementById('uList');
  document.querySelectorAll('.task-style').forEach(t => t.remove());
    
  for(let tsk of taskToDo) {
    const task = document.createElement('li');
    task.innerHTML = `<span><input type="checkbox" id= "id-${tsk.index}">
    <label for= "id-${tsk.index}" id="lb-${tsk.index}">${tsk.description}</label></span>
    <i class= "menu" id="${tsk.index}">__</i>`;
    task.classList.add('task-style');
    task.id = `li-${tsk.index}`;
    list.appendChild(task);
  };

  const checkBox = document.querySelectorAll('input[type=checkbox]');

  checkBox.forEach(box => box.onclick = () => {
    const num = [...`${box.id}`].splice(3).pop();
    (box.checked)? taskToDo[num].completed = true: taskToDo[num].completed = false;
    localStorage.setItem('toDoList', JSON.stringify(taskToDo));
  })
  
  const menuBtn = document.querySelectorAll('.menu');
  menuBtn.forEach(btn => btn.addEventListener('click', (e) => {
    document.getElementById(`li-${e.target.id}`).classList.toggle('bkground');
    document.getElementById(`lb-${e.target.id}`).toggleAttribute('contentEditable');
    if (taskToDo[e.target.id].completed) {
      taskToDo.splice(e.target.id, 1);
    
      for (let i=0; i<taskToDo.length; i+=1) {
        taskToDo[i].index = i;
      }
  
      localStorage.setItem('toDoList', JSON.stringify(taskToDo));
      retrivedata();
    }
    
  }));
}
