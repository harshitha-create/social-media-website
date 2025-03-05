function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!username || !password) {
        alert("Please enter valid credentials");
        return;
    }

    const storedUser = localStorage.getItem("user");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUser && password === storedPassword) {
        alert('Login successful!');
        const profile = localStorage.getItem("profile");
        if (profile) {
            window.location.href = "index.html";
        } else {
            window.location.href = "create-profile.html";
        }
    } else {
        alert('Invalid credentials');
    }
}

function signup() {
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;
    if (!newUsername || !newPassword) {
        alert("Please enter valid credentials");
        return;
    }

    localStorage.setItem("user", newUsername);
    localStorage.setItem("password", newPassword);
    alert('Sign up successful! You can now log in.');
    window.location.href = "login.html";
}

function createProfile() {
    const firstName = document.getElementById("profile-first-name").value;
    const lastName = document.getElementById("profile-last-name").value;
    const email = document.getElementById("profile-email").value;
    const username = document.getElementById("profile-username").value;
    const bio = document.getElementById("profile-bio").value;
    const imageInput = document.getElementById("profile-image");
    const reader = new FileReader();

    if (!firstName || !lastName || !email || !username || !bio || !imageInput.files.length) {
        alert("Please fill in all fields and upload an image");
        return;
    }

    reader.onload = function (e) {
        const profile = {
            firstName,
            lastName,
            email,
            username,
            bio,
            image: e.target.result
        };

        localStorage.setItem("profile", JSON.stringify(profile));
        alert('Profile created successfully!');
        window.location.href = "index.html";
    };

    reader.readAsDataURL(imageInput.files[0]);
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    localStorage.removeItem("profile");
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const createProfileForm = document.getElementById("create-profile-form");
    if (createProfileForm) {
        createProfileForm.addEventListener("submit", function (event) {
            event.preventDefault();
            createProfile();
        });
    }
});