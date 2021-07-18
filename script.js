const taskList = JSON.parse(localStorage.getItem('taskList'));
if (taskList !== null) {
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        const ul = document.querySelector('.taskList');
        const div = document.createElement('div');
        const li = document.createElement('li');
        div.setAttribute('class', 'task-container');
        li.setAttribute('class', 'task');
        li.innerHTML = `<h6>${task}</h6>
                        <a href="#" class="delete-one-of"><i class="fas fa-times"></i></a>`;
        div.appendChild(li)
        ul.appendChild(div);
    }
}

const formInput = document.querySelector('form').querySelector('button');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteOneOfBtns = document.querySelectorAll('.delete-one-of')
for (let i = 0; i < deleteOneOfBtns.length; i++) {
    const btn = deleteOneOfBtns[i];
    btn.addEventListener('click', deleteOneOf);
}
formInput.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', deleteAll);

function addTask(e) {
    const input = document.querySelector('form').querySelector('input');
    const inputContent = input.value;
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    if (taskList === null) {
        const tasks = [];
        tasks.push(inputContent);
        localStorage.setItem('taskList', JSON.stringify(tasks));
    } else {
        taskList.push(inputContent);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }
    input.value = '';

    const ul = document.querySelector('.taskList');
    const div = document.createElement('div');
    const li = document.createElement('li');
    div.setAttribute('class', 'task-container');
    li.setAttribute('class', 'task');
    li.innerHTML = `<h6>${inputContent}</h6>
                    <a href="#" class="delete-one-of"><i class="fas fa-times"></i></a>`;
    li.querySelector('.delete-one-of').addEventListener('click', deleteOneOf);
    div.appendChild(li)
    ul.appendChild(div);
    e.preventDefault();
}

function deleteAll(e) {
    const tasks = document.querySelectorAll('.task-container');
    if (confirm('All tasks will be deleted.\nAre you sure?')) {
        let unit = 100;
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            // task.classList.add('slide-to-remove');
            task.style.transform = `translateX(-${unit}rem)`;
            task.style.opacity = '0';
            task.addEventListener('transitionend', (event) => {
                task.remove();
            });
            unit -= 10;
        }
        localStorage.clear();
    }
}

function deleteOneOf(e) {
    const li = e.target.parentElement.parentElement;
    const h6Text = li.querySelector('h6').innerText;
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    console.log(taskList);
    taskList.splice(taskList.indexOf(h6Text), 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    // li.parentElement.classList.add('fall');
    li.parentElement.style.transform = 'translateY(10rem) rotateZ(20deg)';
    li.parentElement.style.opacity = '0';
    li.parentElement.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity') {
            // console.log('opacity')
            li.parentElement.remove();
        }
    })
}