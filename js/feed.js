document.addEventListener("DOMContentLoaded", function () {
    fetchPosts();

    const createPostForm = document.getElementById("create-post-form");
    if (createPostForm) {
        createPostForm.addEventListener("submit", function (event) {
            event.preventDefault();
            createPost();
        });
    }
});

async function fetchPosts() {
    const response = await fetch("https://dummyjson.com/posts");
    const data = await response.json();
    displayPosts(data.posts);
}

function displayPosts(posts) {
    const container = document.getElementById("feed-container");
    container.innerHTML = "";
    posts.forEach(post => {
        container.innerHTML += `<div class='post fade-in'>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button onclick='likePost(${post.id})'>❤️ Like</button>
            <button onclick='viewPost(${post.id})'>💬 Comments</button>
            <button onclick='sharePost(${post.id})'>🔗 Share</button>
            <button onclick='editPost(${post.id})'>✏️ Edit</button>
        </div>`;
    });

    // Load posts from localStorage
    const feedPosts = JSON.parse(localStorage.getItem("feedPosts")) || [];
    feedPosts.forEach(post => {
        container.innerHTML += `<div class='post fade-in'>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button onclick='likePost(${post.id})'>❤️ Like</button>
            <button onclick='viewPost(${post.id})'>💬 Comments</button>
            <button onclick='sharePost(${post.id})'>🔗 Share</button>
            <button onclick='editPost(${post.id})'>✏️ Edit</button>
        </div>`;
    });
}

function createPost() {
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;

    if (!title || !content) {
        alert("Please fill in both the title and content.");
        return;
    }

    const newPost = {
        title: title,
        body: content,
        id: Date.now() // Using timestamp as a unique ID for demonstration
    };

    savePostToFeed(newPost);
    alert("Post created successfully!");
    window.location.href = "index.html";
}

function savePostToFeed(post) {
    let feedPosts = JSON.parse(localStorage.getItem("feedPosts")) || [];
    feedPosts.push(post);
    localStorage.setItem("feedPosts", JSON.stringify(feedPosts));
}

function likePost(postId) {
    let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    likedPosts[postId] = !likedPosts[postId];
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    alert(likedPosts[postId] ? "Post Liked!" : "Like Removed!");
}

function viewPost(postId) {
    window.location.href = `post.html?postId=${postId}`;
}

function sharePost(postId) {
    const postUrl = `${window.location.origin}/post.html?postId=${postId}`;
    navigator.clipboard.writeText(postUrl).then(() => {
        alert("Post URL copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy post URL.");
    });
}

function editPost(postId) {
    const feedPosts = JSON.parse(localStorage.getItem("feedPosts")) || [];
    const post = feedPosts.find(p => p.id === postId);
    if (post) {
        document.getElementById("post-title").value = post.title;
        document.getElementById("post-content").value = post.body;
        document.getElementById("create-post-form").dataset.editing = postId;
    }
}

document.getElementById("create-post-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    const editingPostId = this.dataset.editing;

    if (!title || !content) {
        alert("Please fill in both the title and content.");
        return;
    }

    if (editingPostId) {
        updatePost(editingPostId, title, content);
    } else {
        createPost();
    }
});

function updatePost(postId, title, content) {
    let feedPosts = JSON.parse(localStorage.getItem("feedPosts")) || [];
    const postIndex = feedPosts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        feedPosts[postIndex].title = title;
        feedPosts[postIndex].body = content;
        localStorage.setItem("feedPosts", JSON.stringify(feedPosts));
        alert("Post updated successfully!");
        window.location.href = "index.html";
    }
}