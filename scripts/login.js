function LoginUser() {
    const email = document.getElementById('email_id').value;
    const password = document.getElementById('password').value;
    // Define the URL you want to send the POST request to
    const url = '/login';

    // Create an object with the data you want to send in the request body
    const data = {
        email: email,
        password: password
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
            window.location.href = '/course'
        })
        .catch(error => {
            console.error(error);
        });

}
