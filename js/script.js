// div where profile info appears
const overview = document.querySelector(".overview");
// GitHub username
const username = "ltlbrd";
// repos list on the page
const repoList = document.querySelector(".repo-list");

// get the user profile from GitHub
async function getGitProfile () {
    const profileInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await profileInfo.json();
    //console.log(data);
    displayProfile(data);
};

getGitProfile();

// display the desired profile data on the page
const displayProfile = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `
    overview.append(div);
    getRepos();
};

// get public repo data via GitHub API for the user
async function getRepos () {
    const fetchRepoData = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    const repoData = await fetchRepoData.json();
    console.log(repoData);
    displayRepos(repoData);
};

// display the repo data on the page
const displayRepos = function (repos) {
  for (repo of repos) {
    const repoItem = document.createElement("li")
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};