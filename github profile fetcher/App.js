const defaultUsername = "Rizwanjamal";

function fetchGitHubProfile(username = defaultUsername) {
    const user = document.getElementById('usernameInput').value.trim() || username;
    const apiURL = `https://api.github.com/users/${user}`;
    const fetchButton = document.getElementById('fetchButton');
    const loader = document.getElementById('loader');

    loader.style.display = "block";
    fetchButton.disabled = true;

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.message === "Not Found") {
                displayNoUserFound();
            } else {
                updateProfile(data);
            }
        })
        .catch(function () {
            displayNoUserFound();
        })
        .finally(function () {
            loader.style.display = "none";
            fetchButton.disabled = false;
        });

    document.getElementById('usernameInput').value = "";
}

function updateProfile(data) {
    document.getElementById('avatar').src = data.avatar_url || "https://via.placeholder.com/100";
    document.getElementById('name').textContent = data.name || "No Name Available";
    document.getElementById('username').textContent = `Username: ${data.login || "Not Available"}`;
    document.getElementById('email').textContent = `Email: ${data.email || "Not Available"}`;
    document.getElementById('bio').textContent = `Bio: ${data.bio || "Not Available"}`;
    document.getElementById('repos').textContent = `Repositories: ${data.public_repos || 0}`;
    document.getElementById('followers').textContent = `Followers: ${data.followers || 0}`;
    document.getElementById('following').textContent = `Following: ${data.following || 0}`;
}

function displayNoUserFound() {
    document.getElementById('avatar').src = "https://via.placeholder.com/100";
    document.getElementById('name').textContent = "*No User Found*";
    document.getElementById('username').textContent = "Username: -";
    document.getElementById('email').textContent = "Email: -";
    document.getElementById('bio').textContent = "Bio: -";
    document.getElementById('repos').textContent = "Repositories: 0";
    document.getElementById('followers').textContent = "Followers: 0";
    document.getElementById('following').textContent = "Following: 0";
}

function toggleTheme() {
    var body = document.body;
    body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
    var icon = document.querySelector('.theme-toggle');
    icon.textContent = body.dataset.theme === "dark" ? "light" : "dark";
}

fetchGitHubProfile();