async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const year = document.getElementById("reg-year").value;
    const hostel = document.getElementById("reg-hostel").value;

    try {
        const res = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, year, hostel })
        });
        const data = await res.json();
        showMessage(data.message);
        if (res.ok) toggleForms(); // switch to login form
    } catch (err) {
        console.log(err);
        showMessage("Server error");
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        showMessage(data.message);
    } catch (err) {
        console.log(err);
        showMessage("Server error");
    }
}

function toggleForms(e) {
    e.preventDefault();
    const loginForm = document.getElementById("login-form-container");
    const regForm = document.getElementById("register-form-container");
    loginForm.classList.toggle("form-hidden");
    regForm.classList.toggle("form-hidden");
}

function showMessage(msg) {
    const messageDiv = document.getElementById("auth-message");
    messageDiv.innerText = msg;
    messageDiv.classList.remove("hidden");
    setTimeout(() => messageDiv.classList.add("hidden"), 3000);
}
