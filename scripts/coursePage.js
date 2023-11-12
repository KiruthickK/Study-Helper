function loadCourse(id) {
    const course_id = id.id.charAt(id.id.length - 1)
    fetch('/getcourse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id: course_id })
    }).then((result) => {
        if (result) {
            window.location.href = '/chapter'
        } else {
            // ADD a message to handle error
        }
    }).catch((err) => {
        console.log(err)
    });
}
function showForm() {
    document.getElementById('course_input_form').classList.remove('d-none')
}
function addCourse() {
    const newCourseName = document.getElementById('new_course_name').value;
    fetch('/createCourse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newCourseName: newCourseName })
    }).then(response => response.json()).then((json) => {
        if (json.success) {
            // add this to the page
            const container = document.getElementById('mainDiv');
            const div = document.createElement('div');
            div.id = 'course_' + json.id;
            console.log(div.id)
            div.classList.add('row', 'rounded', 'bg-secondary', 'p-3')
            div.innerHTML = `<strong>Course ID: </strong>${json.id} <strong>Course name: </strong>${newCourseName}`;
            div.onclick = () => {
                loadCourse(this);
            }
            container.appendChild(div)
        } else if (json.failed) {
            alert('Something went wrong while creating a new user')
        }
    }).catch(err => console.log(err));
}