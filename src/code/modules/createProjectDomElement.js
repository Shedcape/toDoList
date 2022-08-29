function createProjectDomElement(id, input) {
  const div = document.createElement('div');
  div.id = id;
  div.classList.add('project');
  const img = document.createElement('img');
  img.classList.add('project-image');
  img.src = "./assets/project-management-icon-png-14.jpg";
  img.alt = "Project";
  div.appendChild(img);
  const h3 = document.createElement('h3');
  h3.classList.add('project-name');
  h3.innerHTML = input;
  div.appendChild(h3);
  const svg = document.createElement('img')
  svg.classList.add('delete-project');
  svg.src = "./assets/trash-svgrepo-com.svg";
  svg.alt = "Delete Project";
  div.appendChild(svg)
  return div;
}

export default createProjectDomElement;