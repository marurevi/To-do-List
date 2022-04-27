import './style.css';

const list = document.getElementById('uList');

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
