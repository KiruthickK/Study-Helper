function CreateUser() {
    const username = document.getElementById('username').value;
    const roll_no = document.getElementById('roll_no').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email_id').value;
    const password = document.getElementById('password').value;
    const userDetails = {
        username: username,
        roll_no: roll_no,
        age: age,
        email: email,
        password: password
    }
    console.log('herer')
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
                alert(`This email ${email} is already being used..`)
            }
        })
        .catch((err) => {
            console.log(err)
        });

}