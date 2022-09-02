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
  todoCreation: document.querySelector('.create-todo'),
  todoContainer: document.querySelector('.container'),
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
    console.log(el.children)
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
  },
  toggleTodoCreation() {
    if (domControl.todoCreation.style.display === "none") {
      domControl.todoCreation.style.display = "block";
    } else {
      domControl.todoCreation.style.display = "none";
    }
  }
}

document.querySelector('.add-todoButton').addEventListener('click', domControl.toggleTodoCreation);

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
  },
  newTodo(title, description, duedate, priority, checklist) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoCard');
    const fieldset = document.createElement('fieldset');
    fieldset.disabled = true;
    todoDiv.appendChild(fieldset);
    const titleInput = domCreation.createInput("todoTitle", "text", "title", title);
    fieldset.appendChild(titleInput);
    const changeTodo = domCreation.todoButton("changeTodo", "./assets/options-icon-png-1.jpg", "Modify todo", (e) => {
      domControl.changeToDo(e.target.parentElement)
    });
    const deleteTodo = domCreation.todoButton("delete-todo", "./assets/trash-svgrepo-com.svg", "Delete Todo", (e) => {
      const element = e.target.parentElement.parentElement
      domControl.removeElement(element);
    });
    fieldset.appendChild(changeTodo);
    fieldset.appendChild(deleteTodo);
    fieldset.appendChild(domCreation.todoP("Description:"));
    const descInput = domCreation.createInput("todoCategory", "text", "Description", description);
    fieldset.appendChild(descInput);
    fieldset.appendChild(domCreation.todoP("Due date:"));
    const dueDateInput = domCreation.createInput("todoCategory", "text", "Due Date", duedate);
    fieldset.appendChild(dueDateInput);
    fieldset.appendChild(domCreation.todoP("Priority:"));
    const select = domCreation.createSelect(priority);
    fieldset.appendChild(select);
    fieldset.appendChild(domCreation.todoP("Priority:"))
    const checkListEl = domCreation.createCheckList(checklist.length, checklist)
    fieldset.appendChild(checkListEl);
    fieldset.appendChild(domCreation.createCheckListButtons());
    domControl.appendChild(domControl.todoContainer, todoDiv)
  },
  todoP(text) {
    const p = document.createElement('p');
    p.classList.add('todoCategory');
    p.innerHTML = text;
    return p;
  },
  todoButton(cssClass, src, alt, event) {
    const img = document.createElement('img');
    img.classList.add(cssClass);
    img.src = src;
    img.alt = alt;
    img.addEventListener('click', event);
    return img;
  },
  createInput(cssClass, type, name, value) {
    const input = document.createElement('input');
    input.classList.add(cssClass);
    input.type = type;
    input.name = name;
    input.value = value;
    return input;
  },
  createSelect(value) {
    const select = document.createElement('select');
    select.classList.add('todoText');
    function createOption(value) {
      const option = document.createElement('option');
      option.value = value;
      option.innerHTML = value;
      return option;
    }
    const options = [createOption('Low'), createOption('Medium'), createOption('High')];
    options.forEach(x => select.appendChild(x));
    select.value = value;
    return select;
  },
  newCheck() {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.classList.add('todoText')
    input.type = "text";
    input.name = "checklistelement";
    li.appendChild(input);
    return li;
  },
  createCheckListButtons() {
    const div = document.createElement('div');
    div.classList.add('checkbuttons');
    function createButton(cssClass, src, title, alt) {
      const button = document.createElement('img');
      button.classList.add(cssClass);
      button.style.visibility = 'hidden';
      button.src = src;
      button.title = title;
      button.alt = alt;
      return button;
    }
    const addCheckButton = createButton('addcheck', "./assets/plus-icon-17.jpg", "Add an item from the checklist", "Add to checklist");
    addCheckButton.addEventListener('click', (e) => {
      const ul = e.target.parentElement.parentElement.children[10];
      if (ul.children.length > 5) return;
      const li = domCreation.newCheck();
      domControl.appendChild(ul, li)

    });
    const removeCheckButton = createButton('removecheck', "./assets/trash-svgrepo-com.svg", "Remove an item from the checklist", "remove check");
    removeCheckButton.addEventListener('click', (e) => {
      const ul = e.target.parentElement.parentElement.children[10];
      if (ul.lastElementChild) {
        domControl.removeElement(ul.lastElementChild);
      }
    })
    div.appendChild(addCheckButton);
    div.appendChild(removeCheckButton)
    return div;
  },
  createCheckList(nr = 0, values = []) {
    const ul = document.createElement('ul');
    ul.classList.add("todoChecklist");
    function createLi(value = "") {
      const li = document.createElement('li');
      const input = document.createElement('input');
      input.type = "text";
      input.name = "checklistelement";
      input.classList.add('todoText')
      input.value = value;
      li.appendChild(input);
      return li;
    }
    for (let i = 0; i < nr; i++) {
      const li = createLi(values[i]);
      ul.appendChild(li);
    }
    return ul;
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
  let ul = e.target.parentElement.parentElement.children[10];
  if (ul.tagName !== "UL") {
    ul = e.target.parentElement.parentElement.children[8];
  }
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
  const children = e.target.parentElement.children
  console.log(children);
  const filtered = Array.from(children).filter(x => /INPUT|SELECT|UL/.test(x.tagName));
  console.log(filtered)
  const [title, description, duedate, priority, checklist] = filtered;
  console.log(checklist, checklist.children)
  const checklistValues = Array.from(checklist.children).map(li => li.children[0].value);
  console.log(checklistValues)
  domCreation.newTodo(title.value, description.value, duedate.value, priority.value, checklistValues);
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
function createInput(cssClass, type, name, value) {
  const input = document.createElement('input');
  input.classList.add(cssClass);
  input.type = type;
  input.name = name;
  input.value = value;
  return input;
}


function createSelect() {
  const select = document.createElement('select');
  select.classList.add('todoText');
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

function createCheckList(nr = 0, values = []) {
  const ul = document.createElement('ul');
  ul.classList.add(todoChecklist);
  function createLi(value = "") {
    const li = document.createElement('li');
    li.classList.add(cssClass);
    const input = document.createElement('input');
    input.type = "text";
    input.name = "checklistelement";
    input.classList.add('todoText checklistEl')
    input.value = value;
    li.appendChild(input);
    return li;
  }
  for (let i = 0; i < nr; i++) {
    const li = createLi(values[i]);
    ul.appendChild(li);
  }
  return ul;
}

function createCheckListButtons() {
  const div = document.createElement('div');
  div.classList.add('checkbuttons');
  function createButton(cssClass, src, title, alt) {
    const button = document.createElement('img');
    button.classList.add(cssClass);
    button.style.visibility = 'hidden';
    button.src = src;
    button.title = title;
    button.alt = alt;
    return button;
  }
  const addCheckButton = createButton('addcheck', "./assets/plus-icon-17.jpg", "Add an item from the checklist", "Add to checklist");
  addCheckButton.addEventListener('click', (e) => {
    const ul = e.target.parentElement.parentElement.children[10];
    if (ul.children.length > 5) return;
    const li = newCheck();
    domControl.appendChild(ul, li)

  });
  const removeCheckButton = createButton('removecheck', "./assets/trash-svgrepo-com.svg", "Remove an item from the checklist", "remove check");
  removeCheckButton.addEventListener('click', (e) => {
    const ul = e.target.parentElement.parentElement.children[10];
    if (ul.lastElementChild) {
      domControl.removeElement(ul.lastElementChild);
    }
  })
  return div;
}
function newCheck() {
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.classList.add('todoText')
  input.type = "text";
  input.name = "checklistelement";
  li.appendChild(input);
  return li;
}