
class ToDo {
  constructor(title, description, dueDate, priority, notes = "", checklist = []) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._notes = notes;
    this._checklist = checklist
  }
  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get dueDate() {
    return this._dueDate;
  }
  get priority() {
    return this._priority;
  }
  get notes() {
    return this._notes;
  }
  get checklist() {
    return this._checklist;
  }
  set title(str) {
    this._title = str;
  }
  set description(str) {
    this._description = str;
  }
  set dueDate(date) {
    this._dueDate = date;
  }
  set priority(str) {
    this._priority = str;
  }
  set notes(str) {
    this._notes = str;
  }
  addCheck(str) {
    this.checklist.push(str);
  }
  removeCheck(idx) {
    this.checklist.splice(idx, 1);
  }
}

const button = document.querySelector('#addcheck');
button.addEventListener('click', (e) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = "text";
  input.name = "check";
  li.appendChild(input)
  document.querySelector('ul').appendChild(li);
})

const allToDos = [];

const submit = document.querySelector('#execute');
submit.addEventListener('click', execute);

function execute() {
  const collect = [
    document.querySelector('#title').value,
    document.querySelector('#description').value,
    document.querySelector('#duedate').value,
    document.querySelector('#priority').value,
  ];
  const checks = document.querySelectorAll('li > input');
  const collected = [];
  checks.forEach(x => collected.push(x.value))
  collect.push(collected);
  allToDos.push(new ToDo(collect[0], collect[1], collect[2], collect[3], collect[4], collect[5]))
  allToDos.forEach(x => console.log(x))
}

const addProjectButton = document.querySelector('.new');
addProjectButton.addEventListener('click', (e) => {
  const div = document.createElement('div');
  div.classList.add('add-project');
  const input = document.createElement('input');
  input.id = "project-name";
  input.name = "project-name";
  div.appendChild(input);
  const addButton = document.createElement('button');
  addButton.innerHTML = "Add";
  addButton.classList.add('add-button');
  addButton.addEventListener('click', addNewProject)
  div.appendChild(addButton);
  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = "Cancel";
  cancelButton.classList.add('cancel-button');
  cancelButton.addEventListener('click', cancelNewProject);
  div.appendChild(cancelButton);
  document.querySelector('.project-container').appendChild(div);
})

function cancelNewProject() {
  const projectContainer = document.querySelector('.project-container');
  projectContainer.removeChild(projectContainer.lastElementChild);
}

function addNewProject() {
  const input = document.getElementById('project-name');
  if (input.value === "") return;
  const div = document.createElement('div');
  div.classList.add('project');
  const img = document.createElement('img');
  img.classList.add('project-image');
  img.src = "./assets/project-management-icon-png-14.jpg";
  img.alt = "Project";
  div.appendChild(img);
  const h3 = document.createElement('h3');
  h3.classList.add('project-name');
  h3.innerHTML = input.value;
  div.appendChild(h3);
  const svg = document.createElement('img')
  svg.classList.add('delete-project');
  svg.src = "./assets/trash-svgrepo-com.svg";
  svg.alt = "Delete Project";
  div.appendChild(svg)
  cancelNewProject();
  document.querySelector('.project-container').appendChild(div);
}