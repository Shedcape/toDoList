
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
