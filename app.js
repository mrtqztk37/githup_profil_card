const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    //console.log(data);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    //console.log(err);
    createErrorCard("Üzgünüm Aradığın kullanıcıyı bulamadım");
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});

function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p>${userBio}</p>` : " ";
  const cardHTML = ` <div class="card">
    <img class="user-image" src=${user.avatar_url} />
    <div class="user-info">
      <div class="user-name">
        <h2>${user.name}</h2>
        <small>@${user.login}</small>
      </div>
    </div>
    <p>
      I am a software developer and I focus on web and mobile application
      development,Full-stack developer especially through my passion for
      React and React Native an
    </p>
    <ul>
      <li class="fa-solid fa-user-group">${user.followers} <strong>Followers</strong></li>
      <li>${user.following} <strong>Following</strong></li>
      <li>
        <i class="fa-solid fa-bookmark"> </i> ${user.public_repos} <strong>Repository</strong>
      </li>
    </ul>
    <div class="repos" id="repos"></div>
  </div>`;
  main.innerHTML = cardHTML;
}
function createErrorCard(msg) {
  const cardErrorHtml = `<div class="card">
    <h2>${msg}</h2>
    </div>`;
  main.innerHTML = cardErrorHtml;
}
async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    // console.log(data);
    addReposToCard(data);
  } catch (err) {
    //console.log(err);
    createErrorCard("Üzgünüm Repoları Çekerken Hata Oluştu");
  }
}
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 3).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = `<i class="fa-solid fa-bookmark">${repos.name}`;

    reposEl.appendChild("reposLink");
  });
}
