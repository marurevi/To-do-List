import { entryTask } from "./localStorage.js";
import { storageAvailable } from "./storageAvailable.js";

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