function isPasswordValid(password) {
    let isCharPresent = false;
    let isNumberPresent = false;
    for (var i = 0; i < password.length; i++) {
        var ch = password.charAt(i);
        if (ch >= 'a' && ch <= 'z') {
            isCharPresent = true;
        }
        if (ch >= 'A' && ch <= 'Z') {
            isCharPresent = true;
        }
        if (ch >= 0 && ch <= 9) {
            isNumberPresent = true;
        }
    }
    return isCharPresent && isNumberPresent && password.length >= 8;
}
function CreateUser() {
    const username = document.getElementById('username');
    const roll_no = document.getElementById('roll_no');
    const age = document.getElementById('age');
    const email = document.getElementById('email_id');
    const password = document.getElementById('password');
    if (username.value && roll_no.value && age.value && email.value && password.value && isPasswordValid(password.value)) {
        const userDetails = {
            username: username.value,
            roll_no: roll_no.value,
            age: age.value,
            email: email.value,
            password: password.value
        }
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails)
        })
            .then(response => response.json())
            .then((json) => {
                if (json.success) {
                    window.location.href = '/course'
                } else if (json.emailExsisting) {
                    alert(`This email ${email.value} is already being used..`)
                }
            })
            .catch((err) => {
                console.log(err)
            });
    } else if (password.value && !isPasswordValid(password.value)) {
        alert('Your password should contain a alphabet and a number and should have a minimum length of 8!')

    } else {
        alert('Fill all the details')
    }


}