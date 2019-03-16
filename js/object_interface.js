let user = {
    login: "admin@mail.com",
    password: "5555"
}

const result = (() => {

    const btn = document.querySelector("button");
    const passwInputValue = document.querySelector("#inputPassword");
    const loginInputValue = document.querySelector("#inputEmail");
    const firstPage = document.querySelector(".form-signin");
    let viewAlert = document.querySelector(".alert-danger");
    viewAlert.classList.add("hide");

    let secondPage = document.getElementById("second-page");
    secondPage.classList.add("hide");
    let userLogin = document.getElementById("userlog");
    let userPassword = document.getElementById("userpass");
    const btnBack =secondPage.lastElementChild;
    const showPass = userPassword.nextElementSibling;
    
    

    function setLogin(item) {
        localStorage.setItem("login", item.login);
        localStorage.setItem("password", item.password);
    }

    function showAlert(string) {
        viewAlert.classList.remove("hide");
        viewAlert.innerHTML = string;
        setTimeout(function () {
            viewAlert.classList.add("hide");
        }, 1400)
    }

    function password(item) {
        let passLocalStorage = localStorage.getItem("password");
        if (item === passLocalStorage) {
            return 1;
        } else if ((item.length < 4) || (item.length > 12)) {
            showAlert("Пароль должен содержать от 4 до 12 символов.");
            return;
        } else {
            showAlert("Неверный пароль.");
            return;
        }
    }
    function login(login) {
        if (login === localStorage.getItem("login")) {
            return 1;
        } else {
            let regular = /\S+@\S+\.\S+/;
            (regular.test(login)) ? showAlert("Неверный логин."): showAlert("Введите корректный e-mail");
            return;
        }
    }

    function validatyValues() {
        if ((passwInputValue.value.length === 0) || (loginInputValue.value.length === 0)) {
            showAlert("Поля формы не заполнены");
            return;
        }
        password(passwInputValue.value);
        login(loginInputValue.value);
        if (!isNaN(password(passwInputValue.value) + login(loginInputValue.value))) {
            showPages(loginInputValue.value,passwInputValue.value);
        }
    }
    function showPages(login,passw) {
        firstPage.classList.add("hide");
        secondPage.classList.remove("hide");
        userLogin.value = login;
        userPassword.value = passw;
    }
    function backToFuture(){
        secondPage.classList.add("hide");
        firstPage.classList.remove("hide");
    }
    function changeViewPass(){
        if(userPassword.getAttribute("type") == "password"){
            userPassword.setAttribute("type","text");
            showPass.innerHTML = "Скрыть пароль"
        }else{
            userPassword.setAttribute("type","password");
            showPass.innerHTML = "Показать пароль";
        }

    }
    btn.addEventListener("click", validatyValues);
    btnBack.addEventListener("click", backToFuture);
    showPass.addEventListener("click",changeViewPass)
    return {
        setLoginAndPassw: setLogin,
        initComponent:validatyValues
    }
})();

result.setLoginAndPassw(user);
result.initComponent;