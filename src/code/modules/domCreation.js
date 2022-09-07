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
    div.appendChild(addButton);
    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = "Cancel";
    cancelButton.classList.add('cancel-button');
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
    const changeTodo = domCreation.todoButton("changeTodo", "./assets/options-icon-png-1.jpg", "Modify todo");
    const deleteTodo = domCreation.todoButton("delete-todo", "./assets/trash-svgrepo-com.svg", "Delete Todo");
    fieldset.appendChild(changeTodo);
    fieldset.appendChild(deleteTodo);
    fieldset.appendChild(domCreation.todoP("Description:"));
    const descInput = domCreation.createInput("todoText", "text", "Description", description);
    fieldset.appendChild(descInput);
    fieldset.appendChild(domCreation.todoP("Due date:"));
    const dueDateInput = domCreation.createInput("todoText", "text", "Due Date", duedate);
    fieldset.appendChild(dueDateInput);
    fieldset.appendChild(domCreation.todoP("Priority:"));
    const select = domCreation.createSelect(priority);
    fieldset.appendChild(select);
    fieldset.appendChild(domCreation.todoP("Checklist:"))
    const checkListEl = domCreation.createCheckList(checklist.length, checklist)
    fieldset.appendChild(checkListEl);
    fieldset.appendChild(domCreation.createCheckListButtons());
    return todoDiv;
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
    const removeCheckButton = createButton('removecheck', "./assets/trash-svgrepo-com.svg", "Remove an item from the checklist", "remove check");
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

export default domCreation;