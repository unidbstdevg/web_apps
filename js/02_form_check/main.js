function f() {
    if (document.forms[0].login.value.length < 6) {
        document.getElementById("login_error").hidden = false;
    } else {
        document.getElementById("login_error").hidden = true;
    }

    if (document.forms[0].password.value != document.forms[0].password2.value) {
        document.getElementById("password_error").hidden = false;
    } else {
        document.getElementById("password_error").hidden = true;
    }

    if (!document.forms[0].email.value.endsWith("@uni-dubna.ru")) {
        document.getElementById("email_error").hidden = false;
    } else {
        document.getElementById("email_error").hidden = true;
    }

    if (document.forms[0].gender.value == "") {
        document.getElementById("gender_error").hidden = false;
    } else {
        document.getElementById("gender_error").hidden = true;
    }

    let city_index = document.forms[0].city.selectedIndex;

    if (
        document.forms[0].gender.value == "m" &&
        (city_index != 2 && city_index != 3)
    ) {
        document.getElementById("city_m_error").hidden = false;
    } else {
        document.getElementById("city_m_error").hidden = true;
    }

    if (
        document.forms[0].gender.value == "w" &&
        (city_index != 0 && city_index != 1)
    ) {
        document.getElementById("city_w_error").hidden = false;
    } else {
        document.getElementById("city_w_error").hidden = true;
    }
}

var mailing_already_warned = false;
function mailing_change() {
    if (mailing_already_warned) {
        return;
    }

    if (!document.forms[0].mailing.checked) {
        if (confirm("Вы точно хотите отказаться от рассылки?")) {
            mailing_already_warned = true;
        } else {
            document.forms[0].mailing.checked = true;
        }
    }
}
