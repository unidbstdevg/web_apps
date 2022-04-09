window.addEventListener('load', function() {
  // prevent form processing that results in page reload
  document.forms[0].addEventListener("submit", (ev) => {
    ev.preventDefault()
  });
});

function error_handling(statuscode, text) {
  let e_alert = document.querySelector("#formAlert");
  e_alert.hidden = false;

  if (text == "")
    e_alert.innerHTML = "Error " + statuscode;
  else
    e_alert.innerHTML = text;
}

function sign_in() {
  let form = document.forms[0];
  if (!form.checkValidity())
    return;

  var url = "api/auth/login.php";
  var request = new XMLHttpRequest();
  request.open('POST', url, false);

  request.send(new FormData(form));

  if (request.status == 200)
    window.location.href = "list.html";
  else
    error_handling(request.status, request.responseText);
}

function sign_up() {
  let form = document.forms[0];
  if (!form.checkValidity())
    return;

  var url = "api/auth/register.php";
  var request = new XMLHttpRequest();
  request.open('POST', url, false);

  request.send(new FormData(form));

  if (request.status == 200) {
    // hack: send login request to set session via php (and then redirect)
    sign_in();
  } else
    error_handling(request.status, request.responseText);
}
