async function loadProfile(userId = 1) {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    const user = await response.json();
    document.getElementById("profile-name").innerText = `${user.firstName} ${user.lastName}`;
    document.getElementById("profile-email").innerText = user.email;
    document.getElementById("profile-pic").src = user.image;
    loadUserPosts(userId);
}

async function loadUserPosts(userId) {
    const response = await fetch(`https://dummyjson.com/posts/user/${userId}`);
    const data = await response.json();
    const container = document.getElementById("user-posts");
    container.innerHTML = "";
    data.posts.forEach(post => {
        container.innerHTML += `<div class='post fade-in'>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>`;
    });
}

async function searchProfile() {
    const query = document.getElementById("search-query").value;
    if (!query.trim()) {
        alert("Please enter a username to search.");
        return;
    }

    const response = await fetch(`https://dummyjson.com/users/search?q=${query}`);
    const data = await response.json();
    if (data.users.length > 0) {
        loadProfile(data.users[0].id);
    } else {
        alert("No user found with that username.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) {
        window.location.href = "create-profile.html";
    } else {
        document.getElementById("profile-name").innerText = `${profile.firstName} ${profile.lastName}`;
        document.getElementById("profile-email").innerText = profile.email;
        document.getElementById("profile-username").innerText = profile.username;
        document.getElementById("profile-bio").innerText = profile.bio;
        document.getElementById("profile-pic").src = profile.image;
        loadUserPosts(profile.username);
    }

    const toggle = document.getElementById("dark-mode-toggle");
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("dark-mode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

function loadUserPosts(username) {
    const feedPosts = JSON.parse(localStorage.getItem("feedPosts")) || [];
    const userPosts = feedPosts.filter(post => post.username === username);
    const container = document.getElementById("user-posts");
    container.innerHTML = "";
    userPosts.forEach(post => {
        container.innerHTML += `<div class='post fade-in'>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>`;
    });
}
