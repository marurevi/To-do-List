const entryTask = document.getElementById('newTask');

const storageAvailable = (type) => {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22
    // Firefox
    || e.code === 1014
    // test name field too, because code might not be present
    // everything except Firefox
    || e.name === 'QuotaExceededError'
    // Firefox
    || e.name === 'NS_ERROR_DOM_QUOTA_REACHED');
  }
};

export const savedata = () => {
  const listOnStorage = JSON.parse(localStorage.getItem('toDoList')) || [];
  if (storageAvailable('localStorage')) {
    const listElement = {
      description: `${entryTask.value}`,
      completed: false,
      index: JSON.parse(`${listOnStorage.length + 1}`),
    };
    listOnStorage.push(listElement);
    localStorage.setItem('toDoList', JSON.stringify(listOnStorage));
  }
};

export const retrivedata = () => {
  const listOnStorage = JSON.parse(localStorage.getItem('toDoList')) || [];
  const listDisplay = document.getElementById('uList');
  document.querySelectorAll('.task-style').forEach((t) => t.remove());

  listOnStorage.forEach((tsk) => {
    const line = document.createElement('li');
    line.innerHTML = `
    <span>
      <input type="checkbox" id= "id-${tsk.index}" ${tsk.completed ? 'checked' : ''}>
      <input type="text" id="tx-${tsk.index}" value= "${tsk.description}" disabled>
    </span>
    <i class= "menu" id="${tsk.index}">__</i>`;
    line.classList.add('task-style');
    line.id = `li-${tsk.index}`;
    listDisplay.appendChild(line);
  });

  /* Checkbox part */
  const checkBox = document.querySelectorAll('input[type=checkbox]');

  checkBox.forEach((box) => box.addEventListener('click', () => {
    const num = [...`${box.id}`].splice(3).pop() - 1;

    if (box.checked) {
      listOnStorage[num].completed = true;
    } else {
      listOnStorage[num].completed = false;
    }
    localStorage.setItem('toDoList', JSON.stringify(listOnStorage));
  }));

  /* Edition mode */
  const menuBtn = document.querySelectorAll('.menu');
  menuBtn.forEach((btn) => btn.addEventListener('click', (e) => {
    const line = document.getElementById(`li-${e.target.id}`);
    line.classList.toggle('editableMode');
    const indice = e.target.id;

    /* Erase Task */
    if (listOnStorage[indice - 1].completed) {
      listOnStorage.splice((indice - 1), 1);

      for (let i = 1; i < listOnStorage.length + 1; i += 1) {
        listOnStorage[i - 1].index = i;
      }

      localStorage.setItem('toDoList', JSON.stringify(listOnStorage));
      retrivedata();
    }

    /* Edit Task */
    const taskEditable = document.getElementById(`tx-${indice}`);
    taskEditable.disabled = false;
    document.addEventListener('keypress', (i) => {
      listOnStorage[indice - 1].description = i.target.value;
      if (i.key === 'Enter') {
        localStorage.setItem('toDoList', JSON.stringify(listOnStorage));
        taskEditable.disabled = true;
        retrivedata();
      }
    });
  }));
};
