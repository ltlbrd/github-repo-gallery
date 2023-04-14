// div where profile info appears
const overview = document.querySelector(".overview");
// GitHub username
const username = "ltlbrd";
// area of page where repos list is displayed
const repoSection = document.querySelector(".repos");
// repos list on the page
const repoList = document.querySelector(".repo-list");
// individual repo data section
const repoData = document.querySelector(".repo-data");
const viewGallery = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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

// display the repos on the page
const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li")
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

// listen for a click on one of the displayed repos, provide the requested info
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    fetchRepoInfo(repoName);
  }
});

// get an individual repo's info
async function fetchRepoInfo (repoName) {
  const fetchOneRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchOneRepo.json();
  //console.log(repoInfo);
  // get repo languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  //console.log(languageData);

  // list of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }

  repoInfoDisplay(repoInfo, languages);
};

const repoInfoDisplay = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repoSection.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
  viewGallery.classList.remove("hide");
};

// back to gallery button event listener
viewGallery.addEventListener("click", function(e) {
  repoSection.classList.remove("hide");
  viewGallery.classList.add("hide");
});

// dynamic search input function
filterInput.addEventListener("input", function (e) {
  const searchQuery = filterInput.value;
  console.log(searchQuery);
  const repos = document.querySelectorAll(".repo");
  const lowercaseSearch = searchQuery.toLowerCase();
  
  for (const repo of repos) {
    const repoLowerCase = repo.innerText.toLowerCase();
    if (repoLowerCase.includes(lowercaseSearch)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});