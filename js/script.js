// div where profile info appears
const overview = document.querySelector(".overview");
// GitHub username
const username = "ltlbrd";

// get the user profile from GitHub
async function getGitProfile () {
    const profileInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await profileInfo.json();
    //console.log(data);
    displayProfile(data);
};

getGitProfile();

// add the desired profile data to the page
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
};

