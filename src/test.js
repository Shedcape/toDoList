import createProjectDomElement from "./code/modules/createProjectDomElement.js";
import ToDo from "./code/modules/todoClass.js"
import domCreation from "./code/modules/domCreation.js";

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
  saveTodos(projectId, todoList) {
    this.list[projectId].toDos = todoList;
  },
  addToDo(projectId, toDo) {
    console.log(this.list[1])
    this.list[projectId].toDos.push(toDo);
  },
  removeToDo(projectId, name) {
    const index = this.list[projectId].toDos.findIndex(x => x.name === name);
    this.list[projectId].toDos.splice(index, 1);
  },
  retrieveTodos(projectId) {
    const todos = this.list[projectId].toDos;
    return todos;
  }
};

const domControl = {
  projectContainer: document.querySelector(".project-container"),
  todoCreation: document.querySelector('.create-todo'),
  todoContainer: document.querySelector('.container'),
  newProjectPrompt() {
    if (document.getElementById('project-name')) return;
    const div = domCreation.newProject();
    div.childNodes[1].addEventListener('click', control.addNewProject);
    div.childNodes[2].addEventListener('click', domControl.removeNewProjectPrompt)
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
  changeContainerId(id) {
    domControl.projectContainer.id = id;
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
      control.saveProject()
      changeButton.src = "./assets/options-icon-png-1.jpg"
      changeButton.classList.remove('saveChange');
      addCheckButton.style.visibility = "hidden";
      removeCheckButton.style.visibility = "hidden";
      removeButton.classList.remove('tempDelete')
    }
  },
  toggleTodoCreation() {
    if (domControl.todoCreation.style.display === "none") {
      domControl.todoCreation.style.display = "inline";
    } else {
      domControl.todoCreation.style.display = "none";
    }
  },
  emptyContainer() {
    while (domControl.projectContainer.lastElementChild) {
      domControl.projectContainer.removeChild(domControl.projectContainer.lastElementChild);
    }
  }
}

document.querySelector('.add-todoButton').addEventListener('click', domControl.toggleTodoCreation);

const control = {
  loadProject(id, todos) {
    domControl.changeContainerId(id);
    todos.forEach(todo => {
      control.addNewToDo([todo.title, todo.description, todo.dueDate, todo.priority, todo.checklist])
    })
  },
  saveProject() {
    const todoNodes = Array.from(domControl.todoContainer.children);
    const todos = [];
    const projectId = domControl.todoContainer.id;
    todoNodes.forEach(todoNode => {
      const [title, description, duedate, priority, checklist] = control.parseTodoInfo(todoNode);
      todos.push(new ToDo(title, description, duedate, priority, checklist))
    })
    console.log(todos)
  },
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
  },
  parseTodoInfo(e) {
    let children = e.children
    const filtered = Array.from(children).filter(x => /INPUT|SELECT|UL/.test(x.tagName));
    const [title, description, duedate, priority, checklist] = filtered;
    if (title.value === "") return;
    const checklistValues = Array.from(checklist.children).map(li => li.children[0].value);
    return [title.value, description.value, duedate.value, priority.value, checklistValues]
  },
  addNewToDo(array) {
    const [title, description, duedate, priority, checklist] = array;
    console.log(Number(domControl.todoContainer.id))
    projects.addToDo(Number(domControl.todoContainer.id), new ToDo(title, description, duedate, priority, checklist))
    const todoDiv = domCreation.newTodo(title, description, duedate, priority, checklist)
    const [addCheck, deleteCheck] = todoDiv.childNodes[0].childNodes[11].childNodes;
    addCheck.addEventListener('click', (e) => {
      control.addCheck(e);
    });
    deleteCheck.addEventListener('click', (e) => {
      control.removeCheck(e);
    })
    const changeTodo = todoDiv.childNodes[0].childNodes[1];
    changeTodo.addEventListener('click', (e) => {
      domControl.changeToDo(e.target.parentElement);
    })
    const deleteTodo = todoDiv.childNodes[0].childNodes[2];
    deleteTodo.addEventListener('click', (e) => {
      const element = e.target.parentElement.parentElement
      domControl.removeElement(element);
    });
    domControl.appendChild(domControl.todoContainer, todoDiv);
    domControl.toggleTodoCreation()
  },
  addCheck(e) {
    let ul = e.target.parentElement.parentElement.children[10];
    console.log(e.target.parentElement)
    if (ul.tagName !== "UL") {
      ul = e.target.parentElement.parentElement.children[8];
    }
    const li = domCreation.newCheck();
    domControl.appendChild(ul, li)
  },
  removeCheck(e) {
    const ul = e.target.parentElement.parentElement.children[10];
    if (ul.lastElementChild) {
      domControl.removeElement(ul.lastElementChild);
    }
  }
}
document.getElementById('submittodo').addEventListener('click', () => {
  const title = document.getElementById('todotitle').value;
  const description = document.getElementById('tododesc').value;
  const duedate = document.getElementById('tododuedate').value;
  const priority = document.getElementById('todopriority').value;
  const checklist = document.getElementById('todochecklist');
  const checklistValues = Array.from(checklist.children).map(li => li.children[0].value)
  control.addNewToDo([title, description, duedate, priority, checklistValues])
});

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
  let ul = e.target.parentElement.parentElement.children[10];
  if (ul.tagName !== "UL") {
    ul = e.target.parentElement.parentElement.children[8];
  }
  if (ul.lastElementChild) {
    domControl.removeElement(ul.lastElementChild);
  }
}))




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
