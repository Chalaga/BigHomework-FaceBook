const nameInpt = document.querySelector("#registerName")
const lastNameInpt = document.querySelector("#registerLastname")
const mailInpt = document.querySelector("#registerMail")
const passInpt = document.querySelector("#registerPass")
const repassInpt = document.querySelector("#registerRepass")
const form = document.querySelector("form")


const nerr = document.querySelector(".n-err")
const lnerr = document.querySelector(".ln-err")
const merr = document.querySelector(".m-err")
const perr = document.querySelector(".p-err")
const rperr = document.querySelector(".rp-err")

let nameRegex = /^[\p{L}\p{M}]+$/u;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


form.addEventListener("submit", (e) => {
    e.preventDefault()
    nameCheck()
    lastnameCheck()
    mailCheck()
    passCheck()
    repassCheck()

    if (!hasErrors()) {
        addtoLocalStorage()

        setTimeout(function() {
            form.submit();
        }, 400)
    }
})



function hasErrors() {
    return (
        nerr.classList.contains("active") ||
        lnerr.classList.contains("active") ||
        merr.classList.contains("active") ||
        perr.classList.contains("active") ||
        rperr.classList.contains("active")
    );
}


function nameCheck() {

    nameInpt.addEventListener("keyup", () => {
        nameInpt.classList.remove("err-box", "err-img")
        nerr.classList.remove("active")
    });

    if (nameInpt.value == "") {
        nameInpt.classList.add("err-box", "err-img")
        nerr.innerHTML = "Name input can not be empty"
        nerr.classList.add("active")
    } else if (!nameRegex.test(nameInpt.value)) {
        nameInpt.classList.add("err-box", "err-img")
        nerr.innerHTML = "Name must inlude only letters"
        nerr.classList.add("active")
    }

    let storedname = nameInpt.value
}

function lastnameCheck() {

    lastNameInpt.addEventListener("keyup", () => {
        lastNameInpt.classList.remove("err-box", "err-img")
        lnerr.classList.remove("active")
    })

    if (lastNameInpt.value == "") {
        lastNameInpt.classList.add("err-box", "err-img")
        lnerr.classList.add("active")
        lnerr.innerHTML = "Last name input can not be empty"
    } else if (!nameRegex.test(lastNameInpt.value)) {
        lastNameInpt.classList.add("err-box", "err-img")
        lnerr.innerHTML = "Last name must include only letters"
        lnerr.classList.add("active")
    }
}

function mailCheck() {

    mailInpt.addEventListener("keyup", () => {
        mailInpt.classList.remove("err-box", "err-img")
        merr.classList.remove("active")
    })

    if (mailInpt.value == "") {
        mailInpt.classList.add("err-box", "err-img")
        merr.classList.add("active")
        merr.innerHTML = "Mail input can not be empty"
    } else if (!emailRegex.test(mailInpt.value)) {
        mailInpt.classList.add("err-box", "err-img")
        merr.classList.add("active")
        merr.innerHTML = "Mail input must be valid"

    }
}

function passCheck() {

    passInpt.addEventListener("keyup", () => {
        passInpt.classList.remove("err-box", "err-img")
        perr.classList.remove("active")
    })

    if (passInpt.value.length < 8 || passInpt.value.length > 22) {
        passInpt.classList.add("err-box", "err-img")
        perr.classList.add("active")
        perr.innerHTML = "Password must be at least 8 and maximum 22 characters"
    } else if (passInpt.value != repassInpt.value) {
        passInpt.classList.add("err-box", "err-img")
        perr.classList.add("active")
        perr.innerHTML = "Passwords do not match"

    }
}

function repassCheck() {

    repassInpt.addEventListener("keyup", () => {
        repassInpt.classList.remove("err-box", "err-img")
        rperr.classList.remove("active")
    })

    if (repassInpt.value.length < 8 || repassInpt.value.length > 22) {
        repassInpt.classList.add("err-box", "err-img")
        rperr.classList.add("active")
        rperr.innerHTML = "Password must be at least 8 and maximum 22 characters"
    } else if (repassInpt.value != passInpt.value) {
        repassInpt.classList.add("err-box", "err-img")
        rperr.classList.add("active")
        rperr.innerHTML = "Passwords do not match"

    }
}

let users = []



function addtoLocalStorage() {

    let person = {
        name: nameInpt.value,
        lastname: lastNameInpt.value,
        mail: mailInpt.value,
        password: passInpt.value
    };

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let emailExists = storedUsers.some(user => user.mail === person.mail);

    if (emailExists) {
        mailInpt.classList.add("err-box", "err-img")
        merr.classList.add("active")
        merr.innerHTML = "Account already exists with this email";
        e.preventDefault()
    }else {
        storedUsers.push(person);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        
    }
}

