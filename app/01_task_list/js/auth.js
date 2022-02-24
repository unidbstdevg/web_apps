window.addEventListener('load', function() {
  document.forms[0].addEventListener("submit", (ev) => {
    ev.preventDefault()
  });
});

function error_handling(http_status) {
  let e_alert = document.querySelector("#formAlert");
  e_alert.hidden = false;

  switch (http_status) {
    case 400:
      e_alert.innerHTML = "Congratulations! You managed to leave the arguments empty, even though the browser validates the data before sending";
      break;
    case 401:
      e_alert.innerHTML = "Wrong login/password";
      break;
    case 409:
      e_alert.innerHTML = "Login already exist";
      break;

    default:
      e_alert.innerHTML = "Something very bad happend on the server side. Please contact administators";
      break;
  }
}

function sign_in() {
  var url = "api/auth/login.php";
  var request = new XMLHttpRequest();
  request.open('POST', url, false);

  request.send(new FormData(document.forms[0]));

  if (request.status == 200)
    window.location.href = "list.html";
  else
    error_handling(request.status);
}

function sign_up() {
  var url = "api/auth/register.php";
  var request = new XMLHttpRequest();
  request.open('POST', url, false);

  request.send(new FormData(document.forms[0]));

  if (request.status == 200) {
    // hack: send login request to set session via php (and then redirect)
    sign_in();
  }
  else
    error_handling(request.status);
}
