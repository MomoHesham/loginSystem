

"use strict";

let signUp = document.querySelector("#signUp");
let signIn = document.querySelector("#signIn");
let userName = document.querySelector("#userName");
let userEmail = document.querySelector("#userEmail");
let userPass = document.querySelector("#userPass");
let validationDataText = document.querySelector("#validationDataText");
let userSession;
let users;
if (localStorage.getItem("users") == null) {
    users = [];
} else {
    users = JSON.parse(localStorage.getItem("users"));
}
function addUser() {
    if ((userName.value != "") && (userEmail.value != "") && (userPass.value != "")) {
        let emailNames = [];
        if (users.length != 0) {
            for (let i = 0; i < users.length; i++) {
                emailNames.push(users[i].email);
            }
            if (emailNames.includes(userEmail.value)) {
                validationDataText.classList.replace("d-none", "d-block");
                validationDataText.classList.add("fw-bold");
                validationDataText.classList.replace("text-success", "text-danger");
                validationDataText.innerHTML = "This email is already exists";
            }
        }
        if (!(emailNames.includes(userEmail.value))) {
            // console.log("signup");
            let user = {
                name: userName.value,
                email: userEmail.value,
                password: userPass.value
            }
            users.push(user);

            correctData();
            location.pathname = "/loginSystem/index.html";
        }

    } else {

        wrongData();
    }
    localStorage.setItem("users", JSON.stringify(users));

}
function loginUser() {

    if ((userEmail.value != "") && (userPass.value != "")) {
        if (users.length != 0) {
            for (let i = 0; i < users.length; i++) {
            
    
                if ((userEmail.value == users[i].email) && (userPass.value == users[i].password)) {
                    userSession = users[i].name
                    console.log(users[i].email);
                    console.log(users[i].password);
                    correctData();
                    localStorage.setItem("UserSession", userSession);
                    window.location.pathname = "/loginSystem/home.html";

                    break;
                }  else {
                    validationDataText.classList.replace("d-none", "d-block");
                    validationDataText.classList.add("fw-bold");
                    validationDataText.classList.replace("text-success", "text-danger");
                    validationDataText.innerHTML = " Invalid Email OR Password";
                }
            }

        } else {
            validationDataText.classList.replace("d-none", "d-block");
            validationDataText.classList.add("fw-bold");
            validationDataText.classList.replace("text-success", "text-danger");
            validationDataText.innerHTML = "Invalid Data";
        }
    } else {
        wrongData();
    }

}


if (location.pathname == "/loginSystem/home.html") {
    if (localStorage.getItem("UserSession") != null) {
        document.getElementById("boxContent").innerHTML = `<span
        class="text-center d-inline-block text-center w-100 mb-2 text-info fs-3">Welcome ${localStorage.getItem("UserSession")}</span>`;
    } else {
        window.location.pathname = '/loginSystem/index.html';
    }

}
function correctData() {
    validationDataText.classList.replace("d-none", "d-block");
    validationDataText.classList.add("fw-bold");
    validationDataText.classList.replace("text-danger", "text-success");
    validationDataText.innerHTML = "Success";
}
function wrongData() {
    validationDataText.classList.replace("d-none", "d-block");
    validationDataText.classList.add("fw-bold");
    validationDataText.classList.replace("text-success", "text-danger");
    validationDataText.innerHTML = "All inputs Required";
}

function logOut() {
    localStorage.removeItem("UserSession");
    location.pathname = "/loginSystem/index.html";
}