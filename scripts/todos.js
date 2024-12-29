import { baseUrl } from "./baseurl";

let loginData = JSON.parse(localStorage.getItem("loginData"));
if (loginData == null) {
    alert("You are not logged in. Please login to continue");
    window.location.href = "login.html";
}
console.log(loginData);

document.getElementById("username").textContent = `Welcome, ${loginData.username} !`;

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loginData");
    alert("Logged out successfully");
    window.location.href = "login.html";
});

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(`${baseUrl}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: form.title.value,
            description: form.description.value,
            user_id: loginData.id,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Todo added successfully");
            form.reset();
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong ☹️, Please try again after some time");
        });
});

async function getTodos() {
    let todos = await fetch(`${baseUrl}/todos`)
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
    return todos;
}

window.onload = async function () {
    let arr = await getTodos();
    displayTodos(arr);
}

function displayTodos(arr) {
    let cont = document.getElementById("todoCont");
    cont.innerHTML = "";
    arr.map((el, i) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let title = document.createElement("h3");
        title.textContent = `Title :${el.title}`;

        let deadline = document.createElement("h5");
        deadline.textContent = `Deadline :${el.deadline}`;

        let priority = document.createElement("p");
        priority.textContent = `Priority :${el.priority}`;

        card.appendChild(title,priority,deadline);
        cont.appendChild(card);
    });
}