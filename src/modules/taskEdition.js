const menuBtn = document.querySelectorAll('.menu');


export default function editLabel(ev) {
    console.log ('clicked')
  const num = [...`${ev.target.id}`].splice(3).pop();
  let labelTask = document.getElementById(`lb-${num}`);
  labelTask.innerText('Prompt: ');
}

menuBtn.addEventListener('click', editLabel(e));