export const displayer = (listOnStorage, listDisplay) => {
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
}
