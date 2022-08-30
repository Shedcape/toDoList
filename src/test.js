import createProjectDomElement from "./code/modules/createProjectDomElement.js";

import ToDo from "./code/modules/todoClass.js"


class Project {
  constructor(name) {
    this.name = name;
    this.toDos = [];
  }
}

const projects = {
  list: [{
    name: "test1",
    toDos: [],
  },
  {
    name: "test2",
    toDos: [],
  },
  {
    name: "test3",
    toDos: [
      {
        name: "todo1",
      },
      {
        name: "todo2",
      }
    ],
  },],
  get length() {
    return this.list.length;
  },
  addProject(project) {
    this.list.push(project);
  },
  removeProject(id) {
    this.list.splice(id, 1);
  },
  addToDo(projectId, toDo) {
    this.list[projectId].toDos.push(toDo);
  },
  removeToDo(projectId, name) {
    const index = this.list[projectId].toDos.findIndex(x => x.name === name);
    this.list[projectId].toDos.splice(index, 1);
  },
};

const domControl = {
  projectContainer: document.querySelector(".project-container"),
  newProjectPrompt() {
    if (document.getElementById('project-name')) return;
    const div = document.createElement('div');
    div.classList.add('add-project');
    const input = document.createElement('input');
    input.id = "project-name";
    input.name = "project-name";
    div.appendChild(input);
    const addButton = document.createElement('button');
    addButton.innerHTML = "Add";
    addButton.classList.add('add-button');
    addButton.addEventListener('click', control.addNewProject)
    div.appendChild(addButton);
    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = "Cancel";
    cancelButton.classList.add('cancel-button');
    cancelButton.addEventListener('click', domControl.removeNewProjectPrompt);
    div.appendChild(cancelButton);
    domControl.projectContainer.appendChild(div);
  },
  removeNewProjectPrompt() {
    domControl.projectContainer.removeChild(domControl.projectContainer.lastElementChild);
  },
  addToProjectDom(el) {
    domControl.projectContainer.appendChild(el);
  },
  removeProjectFromDom(id) {
    document.getElementById(id).remove();
  }
}

const control = {
  addNewProject() {
    const input = document.getElementById('project-name');
    if (input.value === "") return;
    projects.addProject(new Project(input.value))
    const projectDomElement = createProjectDomElement(projects.length, input.value);
    projectDomElement.childNodes[2].addEventListener('click', (e) => {
      control.removeProject(e);
    })
    domControl.removeNewProjectPrompt();
    domControl.addToProjectDom(projectDomElement);
  },
  removeProject(e) {
    const id = e.target.parentElement.id
    projects.removeProject(id);
    domControl.removeProjectFromDom(id);
  }
}

const addProjectButton = document.querySelector('.new');
addProjectButton.addEventListener('click', domControl.newProjectPrompt)

const addCheck = document.getElementById('addcheck');
addCheck.addEventListener('click', () => {
  const checks = document.querySelectorAll('.newCardChecklist > li');
  if (checks.length > 5) return;
  const li = document.createElement('li');
  li.classList.add('newCardChecklist');
  const input = document.createElement('input');
  input.type = "text";
  input.name = "check";
  li.appendChild(input);
  document.querySelector('.todoCard > ul.newCardChecklist').appendChild(li);
})

const addTodotest = document.getElementById('submittodo');
addTodotest.addEventListener('click', (e) => {
  console.log(e);
  console.log(e.target.parentElement);
  const children = Array.from(e.target.parentElement.childNodes).filter(x => /INPUT|SELECT|UL/.test(x.tagName))
  const checkList = children.splice(children.length - 1, 1);
  console.log(children, checkList);
  const mapped = children.map(x => x.value);
  console.log(mapped)
  const checkListValue = checkList.map(x => Array.from(x.childNodes))[0].filter(x => x.tagName === "LI").map(x => x.firstChild.value);
  console.log(checkListValue)
})