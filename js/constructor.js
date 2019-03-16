let user = {
    login: "admin@mail.com",
    password: "7777"
}

function LoginModule() {
    this.initComponent = () => {
        btn.addEventListener("click", validatyValues);
        btnBack.addEventListener("click", backToFuture);
        showPass.addEventListener("click", changeViewPass);
    }
    this.setLoginPassword = ({login,password}) => {
        localStorage.setItem("login", login);
        localStorage.setItem("password", password);
    }

    const btn = document.querySelector("button");
    const passwInput = document.querySelector("#inputPassword");
    const loginInput = document.querySelector("#inputEmail");
    const firstPage = document.querySelector(".form-signin");
    let viewAlert = document.querySelector(".alert-danger");

    let secondPage = document.getElementById("second-page");
    let userLogin = document.getElementById("userlog");
    let userPassword = document.getElementById("userpass");
    const btnBack = secondPage.lastElementChild;
    const showPass = userPassword.nextElementSibling;


    function pageDisplay() {
        btn.setAttribute("type", "button");
        passwInput.setAttribute("type", "password");
        viewAlert.classList.add("hide");
        secondPage.classList.add("hide");
    }
    pageDisplay();

    function avtorization(pass,login){
        if (!isNaN(pass + login)) {
            showPages(getLogin(), getPass());
        }
    }

    const getPass = () => passwInput.value.trim();
    const getLogin = () => loginInput.value.trim();

    function validatyValues () {
        if ((getPass().length === 0) || (getLogin().length === 0)) {
            showAlert("Поля формы не заполнены");
            return;
        }
        let indexPass = validatePassword(getPass());
        let indexLogin = validateLogin(getLogin());
        avtorization(indexPass,indexLogin);
     
    }

    function validatePassword(item) {
        if (item === localStorage.getItem("password")) {
            return 1;
        }
        if ((item.length < 4) || (item.length > 12)) {
            showAlert("Пароль должен содержать от 4 до 12 символов.");
        } else {
            showAlert("Неверный пароль.");
        }
    }

    function validateLogin(login) {
        if (login === localStorage.getItem("login")) {
            return 1;
        } else {
            let regular = /\S+@\S+\.\S+/;
            (regular.test(login)) ? showAlert("Неверный логин."): showAlert("Введите корректный e-mail");
        }
    }

    function changeViewPass() {
        if (userPassword.getAttribute("type") === "password") {
            userPassword.setAttribute("type", "text");
            showPass.innerHTML = "Скрыть пароль"
        } else {
            userPassword.setAttribute("type", "password");
            showPass.innerHTML = "Показать пароль";
        }
    }

    function backToFuture() {
        secondPage.classList.add("hide");
        firstPage.classList.remove("hide");
    }

    function showPages(login, passw) {
        firstPage.classList.add("hide");
        secondPage.classList.remove("hide");
        userLogin.value = login;
        userPassword.value = passw;
    }

    function showAlert(string) {
        viewAlert.classList.remove("hide");
        viewAlert.innerHTML = string;
        setTimeout(function () {
            viewAlert.classList.add("hide");
        }, 1400)
    }

}

let item = new LoginModule();

item.initComponent();
item.setLoginPassword(user);