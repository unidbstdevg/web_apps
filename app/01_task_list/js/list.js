window.addEventListener('load', function() {
  document.forms[0].addEventListener("submit", (ev) => {
    ev.preventDefault()
  });

  fetch_tasks(redraw_tasks);
});

function add_task() {
  let form = document.forms[0];

  let url = "api/tasks/add.php";
  let request = new XMLHttpRequest();
  request.open('POST', url, false);

  request.send(new FormData(form));

  if (request.status == 200) {
    fetch_tasks(redraw_tasks);
    form.reset();
  } else
    alert("Error " + request.status + " on adding task: " + request.responseText);
}

function delete_task(task_id) {
  let url = "api/tasks/delete.php";
  let request = new XMLHttpRequest();
  request.open('POST', url, false);

  let formData = new FormData();
  formData.append("task_id", task_id);
  request.send(formData);

  if (request.status == 200)
    fetch_tasks(redraw_tasks);
  else
    alert("Error " + request.status + " on deleting task: " + request.responseText);
}

function fetch_tasks(callback) {
  var url = "api/tasks/list.php";
  var request = new XMLHttpRequest();
  request.open('POST', url, false);

  request.send();

  if (request.status == 200) {
    let tasks = JSON.parse(request.responseText);
    callback(tasks);
  } else if (request.status == 403) {
    alert("Please auth first");
    window.location.href = "auth.html";
  }
  else
    alert("Error " + request.status + " on fetching tasks: " + request.responseText);
}

function redraw_tasks(tasks) {
  let e_tasks_list = document.querySelector("#tasksList");
  e_tasks_list.innerHTML = "";

  for (t of tasks) {
    let e_task = create_task_elem(t.name, t.id);
    e_tasks_list.appendChild(e_task);
  }
}

function create_task_elem(task_name, task_id) {
  let elem = document.createElement("tr");

  {
    let td = document.createElement("td");
    td.innerText = task_name;
    elem.appendChild(td);
  }

  {
    let td = document.createElement("td");
    td.innerHTML = "<button class='btn btn-danger' onclick='delete_task(" + task_id + ")'>Delete</button>";
    elem.appendChild(td);
  }

  return elem;
}
