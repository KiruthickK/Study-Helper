function LoginUser() {
    const email = document.getElementById('email_id');
    const password = document.getElementById('password');
    // Define the URL you want to send the POST request to
    const url = '/login';
    if (!email.value || !password.value) {
        alert('Fill all the details...')
        return;
    }
    // Create an object with the data you want to send in the request body
    const data = {
        email: email.value,
        password: password.value
    };

    // Create a request configuration object
    const requestOptions = {
        method: 'POST', // specify the HTTP method
        headers: {
            'Content-Type': 'application/json', // set the content type
            // You can include additional headers here if needed
        },
        body: JSON.stringify(data) // convert the data object to a JSON string
    };

    // Send the POST request
    fetch(url, requestOptions)
        .then(response => response.json())
        .then((json) => {
            console.log(json)
            if (json.success)
                window.location.href = '/course'
            else {
                alert('Credentials not matching')
            }
        })
        .catch(error => {
            console.error(error);
        });

}
