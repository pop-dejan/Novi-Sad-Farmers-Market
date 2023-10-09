//** Navbar links responsive class changing **//
let contactLinkWidth = window.matchMedia('(max-width: 992px)');
contactLinkWidth.addEventListener('change', contactLinkMedia);

function contactLinkMedia(event) {
    if (event.matches) {
        document.querySelectorAll('.link').forEach(link => { link.classList.remove('mx-3') });
        document.querySelectorAll('.nav-link').forEach(link => { link.style.paddingBottom = "0.2rem"; link.style.paddingTop = "0.2rem"; });
    } else {
        document.querySelectorAll('.link').forEach(link => { link.classList.add('mx-3') });
        document.querySelectorAll('.nav-link').forEach(link => { link.style.paddingBottom = "0.5rem"; link.style.paddingTop = "0.5rem"; });
    }
}

if(contactLinkWidth.matches){
    document.querySelectorAll('.link').forEach(link => { link.classList.remove('mx-3') });
    document.querySelectorAll('.nav-link').forEach(link => { link.style.paddingBottom = "0.2rem"; link.style.paddingTop = "0.2rem"; });
} else {
    document.querySelectorAll('.link').forEach(link => { link.classList.add('mx-3') });
    document.querySelectorAll('.nav-link').forEach(link => { link.style.paddingBottom = "0.5rem"; link.style.paddingTop = "0.5rem"; });
}

//** Navbar scrooll tomato animation **//
window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.querySelector('#myBar').style.width = scrolled + "%";
}

//** Barometer section buttons color and tables changing depending on selected button **//
let barometerButtons = document.querySelectorAll('.cb');
let vegetablesTable = document.querySelector('#vegetables');
let fruitsTable = document.querySelector('#fruits');
let otherTable = document.querySelector('#other');
barometerButtons.forEach(button => { button.addEventListener('click', barometerBtnFunction) });

function barometerBtnFunction() {
    if (this.id === "mybutton1") {
        vegetablesTable.style.display = "block";
        fruitsTable.style.display = "none";
        otherTable.style.display = "none";
    } else if (this.id === "mybutton2") {
        vegetablesTable.style.display = "none";
        fruitsTable.style.display = "block";
        otherTable.style.display = "none";
    } else if (this.id === "mybutton3") {
        vegetablesTable.style.display = "none";
        fruitsTable.style.display = "none";
        otherTable.style.display = "block";
    }
}

//** Barometer section setting current date to date input **//
document.querySelectorAll('#date').forEach(date => { date.valueAsDate = new Date() });

//** Some preloaded users **/
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

let user1 = new User("Pera97", "pera997@gmail.com", "111111");
let user2 = new User("Mika96", "mika196@gmail.com", "password12345");
let user3 = new User("Laza95", "lazar95@gmail.com", "otherpassword12345");

let users = [];
users.push(user1, user2, user3)

//** Sign up Form validation and errors **/
function validateForm(forma) {
    let inputs = document.querySelectorAll('.control-1');
    let password1 = document.querySelector('#password');

    inputs.forEach(input => {
        input_error = input.nextElementSibling;
        if (input.value.trim() == "") {
            input_error.innerText = "Blank field!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "username" && input.value.length < 6) {
            input_error.innerText = "Username cannot have less than 6 characters!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "email" && emailMatch(input.value) == true) {
            input_error.innerText = "Email address is taken!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "email" && validateEmail(input.value) == false) {
            input_error.innerText = "Invalid email address!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "password" && input.value.length < 6) {
            input_error.innerText = "Password cannot have less than 6 characters!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "repeat_password" && password1.value !== input.value) {
            input_error.innerText = "Passwords do not match!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else {
            input_error.innerText = "";
            input.style.borderColor = "black";
            input.style.backgroundColor = "#fff";
        }
    });

    let retVal = true;

    let username = forma.username.value.trim();
    if (username == "" || username.length < 6) {

        retVal = false;
    }


    let email = forma.email.value.trim();
    if (email == "" || validateEmail(email) == false || emailMatch(email) == true) {
        retVal = false;
    }


    let password = forma.password.value.trim();
    if (password == "" || password.length < 6) {
        retVal = false;
    }

    let repeat_password = forma.repeat_password.value.trim();
    if (repeat_password == "" || password !== repeat_password) {
        retVal = false;
    }

    return retVal;
}

//** Email validation function **/
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

//** Function checking compatibility between existing user emails and entered email **/
function emailMatch(input) {
    let brojac = 0;
    for (i = 0; i < users.length; i++) {
        if (users[i].email === input) {
            brojac++;
        }
    }

    if (brojac > 0) {
        return true;
    } else {
        return false;
    }
}

//** Function checking compatibility between existing users password and entered password **/
function passwordMatch(email, password) {
    let user = new User;

    for (i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            user = users[i];
        }
    }

    if (user.password === password) {
        return true;
    } else {
        return false;
    }
}

//** Sign up form toggle input errors appearance **/
let inputs = document.querySelectorAll('.control-1');
inputs.forEach(input => { input.addEventListener('input', toogleInputs) });

function toogleInputs() {
    let error = this.nextElementSibling;
    let password_value = document.querySelector('#password').value;
    if (this.value.trim() != "") {
        error.innerText = "";
        this.style.borderColor = "black";
        this.style.backgroundColor = "#fff";
    }

    if (this.id == "username" && this.value.length < 6) {
        error.innerText = "Username cannot have less than 6 characters!";
        this.style.borderColor = "red";
        this.style.backgroundColor = "rgb(232, 191, 191)";
    } else if (this.id == "email" && validateEmail(this.value) == false) {
        error.innerText = "Invalid email address";
        this.style.borderColor = "red";
        this.style.backgroundColor = "rgb(232, 191, 191)";
    } else if (this.id == "password" && this.value.length < 6) {
        error.innerText = "Password cannot have less than 6 characters!";
        this.style.borderColor = "red";
        this.style.backgroundColor = "rgb(232, 191, 191)";
    } else if (this.id == "repeat_password" && this.value != password_value) {
        error.innerText = "Passwords do not match!";
        this.style.borderColor = "red";
        this.style.backgroundColor = "rgb(232, 191, 191)";
    } else {
        error.innerText = "";
        this.style.borderColor = "black";
        this.style.backgroundColor = "#fff";
    }
}

//** Toggle password visibility based on check **/
let passwordChecks = document.querySelectorAll('.form-check-input');
passwordChecks.forEach(check => { check.addEventListener('click', togglePasswords) });

function togglePasswords() {
    let passwordInputs = document.querySelectorAll('.psw');
    passwordInputs.forEach(input => {
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    });
}

//**Sign in form validation and errors **/
function validateForm2(forma) {

    let inputs2 = document.querySelectorAll('.control-2');
    inputs2.forEach(input => {
        input_error = input.nextElementSibling;
        if (input.value.trim() == "") {
            input_error.innerText = "Blank field!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "email2" && emailMatch(input.value) == false) {
            input_error.innerText = "Email or password are invalid!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "email2" && validateEmail(input.value) == false) {
            input_error.innerText = "Invalid email address!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "email2" && passwordMatch(input.value, inputs2[1].value) == false) {
            input_error.innerText = "Email or password are invalid!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else {
            input_error.innerText = "";
            input.style.borderColor = "black";
            input.style.backgroundColor = "#fff";
        }
    });

    let retVal = true;

    let email = forma.email2.value.trim();
    if (email == "" || validateEmail(email) == false || emailMatch(email) == false) {
        retVal = false;
    }

    let password = forma.password2.value.trim();
    if (password == "" || passwordMatch(email, password) == false) {
        retVal = false;
    }

    return retVal;
}

//** Sign in form toggle input errors appearance **/
let inputs2 = document.querySelectorAll('.control-2');
inputs2.forEach(input => { input.addEventListener('input', toogleInputs2) });

function toogleInputs2() {
    let error = this.nextElementSibling;
    if (this.value.trim() != "") {
        error.innerText = "";
        this.style.borderColor = "black";
        this.style.backgroundColor = "#fff";
    }

    if (this.id === "email2" && validateEmail(this.value) == false) {
        error.innerText = "Invalid email address!";
        this.style.borderColor = "red";
        this.style.backgroundColor = "rgb(232, 191, 191)";
    } else if (this.id === "password2" && this.value.length < 6) {
        error.innerText = "Password cannot have less than 6 characters!";
        this.style.borderColor = "red";
        this.style.backgroundColor = "rgb(232, 191, 191)";
    } else {
        error.innerText = "";
        this.style.borderColor = "black";
        this.style.backgroundColor = "#fff";
    }
}

//** Toggle scroll button **/
let mybuttons = document.querySelectorAll('.scroll-btn');

mybuttons.forEach(button => {
    window.onscroll = () => {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }

    }

    button.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});

//** Function displaying animations **/
function animationToggle() {
    var elements;
    var windowHeight;

    function init() {
        elements = document.querySelectorAll('.hidden');
        windowHeight = window.innerHeight;
    }

    function checkPosition() {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var positionFromTop = elements[i].getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
                if (element.classList.contains('news')) {
                    element.classList.add('animation-left');
                    element.classList.remove('hidden');
                } else if (element.classList.contains('location-main')) {
                    element.classList.add('animation-right');
                    element.classList.remove('hidden');
                } else if (element.classList.contains('seasonal')) {
                    element.classList.add('animation-left');
                    element.classList.remove('hidden');
                } else if (element.classList.contains('news-info') || element.classList.contains('all-tables-wrapper')
                    || element.classList.contains('markets-today') || element.classList.contains('markets-history')
                    || element.classList.contains('carousel-info') || element.classList.contains('about-text')
                    || element.classList.contains('location')) {
                    element.classList.add('animation-fade-in');
                    element.classList.remove('hidden');
                } else if (element.classList.contains('month')) {
                    if (element.classList.contains('first-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.2s";
                    } else if (element.classList.contains('second-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('third-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "1s";
                    } else if (element.classList.contains('fourth-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('fifth-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('sixth-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('seventh-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('eighth-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('ninth-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('tenth-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('eleventh-month')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    } else if (element.classList.contains('last')) {
                        element.classList.add('animation-right-m');
                        element.style.animationDelay = "0.5s";
                    }
                }
            }
        }
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
}

animationToggle();






























































