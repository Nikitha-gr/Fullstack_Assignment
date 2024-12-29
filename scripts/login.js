import { baseUrl } from "./baseurl.js";

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = form.email.value;
    let password = form.password.value;

    //Checking if email is present in the DB
    fetch(`${baseUrl}/users`)
        .then((res) => res.json())
        .then((data) => {
            let user = data.filter((el, i) => el.email == email);
            if (user.length != 0) {
                //If user present, then check for password
                user.map((el, i) => {
                    if (user[i].password == password) {
                        alert("Login Sucessfull ✅");
                        localStorage.setItem("loginData", JSON.stringify(user[i]))
                        window.location.href = "todos.html"
                    } else {
                        alert("Sorry, your password was incorrect ❌. Please double-check your password.")
                    }
                })

            } else {
                //if user not present
                alert("User not registred, Please signup....📝");
                window.location.href = "signup.html"
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong ☹️, Please try again after some time");
        });
});