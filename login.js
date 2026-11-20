document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    console.log("Login button clicked!");

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "president@aiub.edu" && password === "123456") {

        alert("Login Successful!");

        window.location.href = "president.html";

    } 
     if (email === "visitor@aiub.edu" && password === "123456") {

        alert("Login Successful!");

        window.location.href = "normal visitor.html";

    }
     if (email === "admin@aiub.edu" && password === "123456") {

        alert("Login Successful!");

        window.location.href = "Admin.html";

    }
    if (email === "member@aiub.edu" && password === "123456") {

        alert("Login Successful!");

        window.location.href = "member.html";

    }
    else {

        document.getElementById("loginError").innerHTML =
            "Invalid Email or Password!";

    }

});