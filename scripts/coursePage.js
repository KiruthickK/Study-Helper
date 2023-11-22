function loadCourse(id) {
    console.log(id)
    const ch = id.id.split('_');
    const course_id = ch[1];
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
            alert('something went wrong')
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
            div.innerHTML = `
                            <button class="btn btn-primary d-flex" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onclick="editCourse(event, ${json.id})">Edit</button>
                            <button onclick="DeleteThisCourse(event, ${json.id})">Delete</button>
                            <strong>
                                Course ID: 
                            </strong>
                            <span id="cid_${json.id}">
                                ${json.id} 
                            </span>
                            <strong>
                                Course name: 
                            </strong>
                            <span id="cname_${json.id}">
                                ${newCourseName}
                            </span>
                            `;
            div.addEventListener('click', function (event) {
                loadCourse(event.target);
            });
            container.appendChild(div)
        } else if (json.failed) {
            alert('Something went wrong while creating a new user')
        }
    }).catch(err => console.log(err));
}
let editableCourseId = -1;
function editCourse(event, id) {
    event.stopPropagation();
    const inpBox = document.getElementById('editCourseNameInput');
    const titleSpan = document.getElementById(`cname_${id}`);
    inpBox.value = titleSpan.innerText;
    editableCourseId = id;
}
function saveEditedChanges() {
    const newName = document.getElementById(`editCourseNameInput`).value;
    fetch('/editCourse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName: newName, id: editableCourseId })
    }).then(response => response.json()).then((json) => {
        if (json.success) {
            const titleSpan = document.getElementById(`cname_${editableCourseId}`);
            titleSpan.innerText = newName;
        }
    }).catch((err) => {
        console.log(err);
    })
}
function DeleteThisCourse(event, id) {
    event.stopPropagation();
    fetch('/deleteCourse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }).then(response => response.json()).then((json) => {
        if (json.success) {
            const div = document.getElementById(`course_${id}`)
            div.parentNode.removeChild(div);
        } else {
            alert('Course cannot be deleted')
        }
    })
}