let storedUsers = JSON.parse(localStorage.getItem("users"));
let user = storedUsers.find(el => el.mail);
console.log(storedUsers);

const section = document.querySelector("section");
const input = document.querySelector("input");

input.placeholder = `What's on your mind, ${user.name}?`;

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        post();
    }
});

let posts = [];

function post() {
    if (input.value.trim() !== "") {
        addtoLocalStorage();
        input.value = "";
    }
}

function addtoLocalStorage() {
    posts.push(input.value);
    localStorage.setItem("posts", JSON.stringify(posts));
    updatePage();
}

function updatePage() {
    const dateoftoday = new Date();
    section.innerHTML = posts.map(post => `
        <div class="box">
            <div class="top">
                <div class="group">
                    <div class="profilePic"></div>
                    <div class="name">
                        <h1>${user.name} ${user.lastname}</h1>
                        <p>${dateoftoday}</p>
                    </div>
                </div>
                <div class="delete" onclick="deletePost('${post}')">X</div>
            </div>
            <div class="post">
                <h2>${post}</h2>
            </div>
            <hr>
            <div class="react">
                <h3>like</h3>
                <h3>comment</h3>
                <h3>share</h3>
            </div>
        </div>`).join("");
}

function deletePost(content) {
    posts = posts.filter(post => post !== content);
    localStorage.setItem("posts", JSON.stringify(posts));
    updatePage(); 
}

