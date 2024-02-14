const form = document.querySelector("form")
const emailInpt = document.querySelector("#loginMail")
const passwordInpt = document.querySelector("#loginPassword")
const loginerr = document.querySelector(".loginerr")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    loginCheck()

    if (valid) {
        form.submit()
    }

})

let valid = false


function loginCheck() {
    emailInpt.addEventListener("keyup", () => {
        emailInpt.classList.remove("err-box", "err-img")
        loginerr.classList.remove("active")

    })

    passwordInpt.addEventListener("keyup", () => {
        passwordInpt.classList.remove("err-box", "err-img")
        loginerr.classList.remove("active")

    })


    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let user = storedUsers.find(el => el.mail == emailInpt.value)


    if (user) {
        if (user.password === passwordInpt.value) {
            valid = true;
        } else {
            emailInpt.classList.add("err-box", "err-img");
            passwordInpt.classList.add("err-box", "err-img");
            loginerr.classList.add("active");
            loginerr.innerHTML = "Incorrect password";
        }
    } else {
        emailInpt.classList.add("err-box", "err-img");
        passwordInpt.classList.add("err-box", "err-img");
        loginerr.classList.add("active");
        loginerr.innerHTML = "Email not found in data";
    }
}

