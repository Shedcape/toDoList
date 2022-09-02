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
    const div = domCreation.newProject();
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
  },
  removeElement(el) {
    el.remove();
  },
  appendChild(target, el) {
    target.appendChild(el);
  },
  changeToDo(el) {
    const changeButton = el.children[1];
    const removeButton = el.children[2];
    const addCheckButton = el.children[11].children[0];
    const removeCheckButton = el.children[11].children[1];
    if (el.disabled) {
      el.disabled = false;
      changeButton.src = "./assets/save-as-icon-9.jpg"
      changeButton.classList.add('saveChange');
      removeButton.classList.add('tempDelete')
      addCheckButton.style.visibility = "visible";
      removeCheckButton.style.visibility = "visible";
    } else {
      el.disabled = true;
      changeButton.src = "./assets/options-icon-png-1.jpg"
      changeButton.classList.remove('saveChange');
      addCheckButton.style.visibility = "hidden";
      removeCheckButton.style.visibility = "hidden";
      removeButton.classList.remove('tempDelete')
    }

  }
}
const domCreation = {
  newProject() {
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
    return div;
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

const addCheck = document.querySelectorAll('.addcheck');
addCheck.forEach(x => x.addEventListener('click', (e) => {
  const ul = e.target.parentElement.parentElement.children[10];
  if (ul.children.length > 5) return;
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.classList.add('todoText')
  input.type = "text";
  input.name = "checklistelement";
  li.appendChild(input);
  domControl.appendChild(ul, li)
}))

const removeCheck = document.querySelectorAll('.removecheck');
removeCheck.forEach(x => x.addEventListener('click', (e) => {
  const ul = e.target.parentElement.parentElement.children[10];
  if (ul.lastElementChild) {
    domControl.removeElement(ul.lastElementChild);
  }
}))


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

const changeTodoButtons = document.querySelectorAll('.changeTodo');
changeTodoButtons.forEach(x => x.addEventListener('click', (e) => {
  domControl.changeToDo(e.target.parentElement);
}))


const deleteTodoButtons = document.querySelectorAll('.delete-todo');
deleteTodoButtons.forEach(x => x.addEventListener('click', (e) => {
  const element = e.target.parentElement.parentElement
  domControl.removeElement(element);
}
))

/**
 *   const inputs = [createInput('todoTitle'), createInput("newtodoinput"), createInput("newtodoinput"), createSelect()]
  
children.forEach((x, i) => {
    const value = x.innerHTML;
    const parent = e.target.parentElement;
    const input = inputs[i];
    input.value = value;
    parent.insertBefore(input, x);
    x.remove();
  });
 */

/**
 * Below is a bunch of functions in an attempt to create an entirely new card. 
 * Trying to decide between the approach of replacing each part on an existing card element with inputs to change a todo, or replace it with an entirely new card element with inputs. 
 * Further tinkering is needed. 
 * 
 *  Note to self
 * Two possible approaches to investigate:
 * First of all to use the method Node.replaceWith(newNode) to replace the p elements with input elements. Perhaps do some form of attribute transer as part of it as a separate function. 
 * Second of all to use styled disabled input elements to display the value, and when the button to change is clicked a method/function turns them enabled instead. The change button would be turned into a save button that when saved updates the relevant data structures. 
 * 
 */
function createInput(cssClass, type) {
  const input = document.createElement('input');
  input.classList.add(cssClass);
  input.type = type;
  return input;
}


function createSelect() {
  const select = document.createElement('select');
  select.classList.add('priorityinput');
  function createOption(value) {
    const option = document.createElement('option');
    option.value = value;
    option.innerHTML = value;
    return option;
  }
  const options = [createOption('Low'), createOption('Medium'), createOption('High')];
  options.forEach(x => select.appendChild(x));
  return select;
}

function createCheckList(cssClass, nr, values = []) {
  const ul = document.createElement('ul');
  ul.classList.add(cssClass);
  function createLi(value = "") {
    const li = document.createElement('li');
    li.classList.add(cssClass);
    if (cssClass === "newCardChecklist") {
      const input = document.createElement('input');
      input.type = "text";
      input.name = "check";
      input.value = value;
      li.appendChild(input);
    } else {
      li.value = value;
    }
    return li;
  }
  for (let i = 0; i < nr; i++) {
    const li = createLi(values[i]);
    ul.appendChild(li);
  }
  return ul;
}