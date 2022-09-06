export default class ToDo {
  constructor(title, description, dueDate, priority, checklist = []) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
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
