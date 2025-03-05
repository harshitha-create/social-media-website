// post.js - Fetch and display post details with comments
async function loadPostDetails() {
    const postId = new URLSearchParams(window.location.search).get("postId");
    if (!postId) {
        alert("Invalid post ID");
        return;
    }
    
    // Fetch post details
    const response = await fetch(`https://dummyjson.com/posts/${postId}`);
    const post = await response.json();
    document.getElementById("post-container").innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <small>👍 ${post.reactions.likes} | 👎 ${post.reactions.dislikes}</small>
        <h3>Comments</h3>
        <div id="comments"></div>
        <input type="text" id="commentInput" placeholder="Add a comment...">
        <button onclick="addComment(${postId})">Post Comment</button>
    `;
    
    // Fetch comments
    loadComments(postId);
}

async function loadComments(postId) {
    const response = await fetch(`https://dummyjson.com/comments/post/${postId}`);
    const data = await response.json();
    const commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "";
    data.comments.forEach(comment => {
        commentsContainer.innerHTML += `<p><strong>${comment.user.username}:</strong> ${comment.body}</p>`;
    });
}

function addComment(postId) {
    const commentInput = document.getElementById("commentInput").value;
    if (!commentInput.trim()) {
        alert("Comment cannot be empty.");
        return;
    }
    const newComment = `<p><strong>You:</strong> ${commentInput}</p>`;
    document.getElementById("comments").innerHTML += newComment;
    document.getElementById("commentInput").value = "";
}

function savePostToFeed(post) {
    let feedPosts = JSON.parse(localStorage.getItem("feedPosts")) || [];
    feedPosts.push(post);
    localStorage.setItem("feedPosts", JSON.stringify(feedPosts));
}

document.addEventListener('DOMContentLoaded', () => {
    loadPostDetails();
    const postsContainer = document.getElementById('posts-container');
    // Example posts
    const posts = [
        { title: 'Post 1', content: 'This is the content of post 1.' },
        { title: 'Post 2', content: 'This is the content of post 2.' },
        { title: 'Post 3', content: 'This is the content of post 3.' }
    ];

    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postsContainer.appendChild(postItem);
    });

    const createPostForm = document.getElementById("create-post-form");
    if (createPostForm) {
        createPostForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const title = document.getElementById("post-title").value;
            const content = document.getElementById("post-content").value;
            const profile = JSON.parse(localStorage.getItem("profile"));

            if (!title || !content) {
                alert("Please fill in both the title and content.");
                return;
            }

            const newPost = {
                title: title,
                body: content,
                username: profile.username,
                id: Date.now() // Using timestamp as a unique ID for demonstration
            };

            savePostToFeed(newPost);
            alert("Post created successfully!");
            window.location.href = "index.html";
        });
    }
});
