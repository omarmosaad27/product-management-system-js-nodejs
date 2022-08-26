// signup form global variables
let form = document.getElementsByTagName("form")
let username = document.getElementById("username")
let email = document.getElementById("email")
let password = document.getElementById("password")
let confirm_password = document.getElementById("confirm-password")
let submit_form = document.querySelector(".submit_form")

/*  
 * start signup form  functionality 
 */
form.addEventListener("submit", function(event) {
    validateForm()
    if (isFormValid == true) {
        document.form.submit()
    } else {
        event.preventDefault();
    }
});
function isFormValid() {
    const inputContainers = form.querySelectorAll(".input-group")
    let result = true;
    inputContainers.forEach((container) => {
        if (container.classList.contains("error")) {
            result = false;
        }
    })
    return result;
}
function validateForm() {
    // username
    if (username.value.trim() == "") {
        setError(username,"name can not be empty")
    } else if (username.value.trim().length < 5 || username.value.trim().length > 20) {
        setError(username,"name min 5 and max 20 characters")
    } else {
        setSuccess(username)
    }
    // email
    if (email.value.trim() == "") {
        setError(email,'provide email address')
    } else if (isEmailValid(email.value)) {
        setSuccess(email)
        console.log(isEmailValid(email.value));
    } else {
        setError(email, 'provide valid email address')
    }
    // password
    if (password.value.trim() == "") {
        setError(password,"passowrd can not be empty")
    } else if (password.value.trim().length < 6 || password.value.trim().length > 20) {
        setError(password,"passowrd min 6 and max 20 characters")
    }else{
        setSuccess(password)
    }
    // confirmpassword
    if (confirm_password.value.trim() == "") {
        setError(confirm_password,"passowrd can not be empty")
    } else if (password.value !== confirm_password.value) {
        setError(confirm_password,"passowrd does not match")
    }else{
        setSuccess(confirm_password)
    }
};
function setError(ele,msg) {
    const parent = ele.parentElement;
    parent.classList.remove('success')
    parent.classList.add('invalid')
    const paragraph = parent.querySelector("p")
    paragraph.textContent = msg
};
function setSuccess(ele) {
    const parent = ele.parentElement;
    parent.classList.remove('invalid')
    parent.classList.add('success')
    const paragraph = parent.querySelector("p")
    paragraph.textContent = ""
}
function isEmailValid(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
    return regex.test(email)
}
/*  


 * end signup form  functionality 
 */ 