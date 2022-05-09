export const entryTask = document.getElementById('newTask');
import { displayer } from "./displayOnUI.js";

export const retrivedata = () => {
  const listOnStorage = JSON.parse(localStorage.getItem('toDoList')) || [];
  const listDisplay = document.getElementById('uList');
  document.querySelectorAll('.task-style').forEach((t) => t.remove());

  // functionCall here () =>   =>   =>   =>
  displayer(listOnStorage, listDisplay);

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
