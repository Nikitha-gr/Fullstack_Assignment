const navbar = () => {
    let card = `<a id="logo" href="index.html">My Personal App</a>
            <div id="nav-links">
                <a href="signup.html"> Signup </a>
                <a href="login.html"> Login </a>
                <a href="todos.html"> Todos </a>
      </div>`;

    document.getElementById("nav").innerHTML = card

};
navbar();