function loadChapter(id) {
    const ch = id.id.split('_');
    const chapter_id = ch[1];
    fetch('/loadchapter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chapter_id: chapter_id })
    }).then((result) => {
        if (result) {
            window.location.href = '/notes'
        } else {
            // ADD a message to handle error
        }
    }).catch((err) => {
        console.log(err);
    });
}
function showForm() {
    document.getElementById('chapter_input_form').classList.remove('d-none')
}
function addCourseCancel() {
    document.getElementById('chapter_input_form').classList.add('d-none')
}
function addChapter() {
    const newChapterName = document.getElementById('new_chapter_name').value;
    fetch('/createChapter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newChapterName: newChapterName })
    }).then(response => response.json()).then((json) => {
        if (json.success) {
            // add this to the page
            const container = document.getElementById('mainDiv');
            const div = document.createElement('div');
            div.id = 'chapter_' + json.id;
            console.log(div.id)
            div.classList.add('m-5', 'rounded', 'bg-light', 'p-3', 'position-relative')
            div.innerHTML = `
                            <button class="btn btn-info position-relative  m-1" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onclick="editChapter(event,${json.id})">Edit</button>
                            <button onclick="deleteChapter(event, ${json.id})" class="btn btn-danger position-absolute top-0 end-0 m-1">Delete</button>
                            <strong>
                                Chapter name: 
                            </strong>
                            <span id="cname_${json.id}">
                                ${newChapterName}
                            </span>`;
            div.addEventListener('click', function (event) {
                loadChapter(event.target);
            });
            container.appendChild(div)
            document.getElementById('chapter_input_form').classList.add('d-none')
        } else if (json.failed) {
            alert('Something went wrong while creating a new user')
        }
    }).catch(err => console.log(err));
}
let editableChapterId = -1;
function editChapter(event, id) {
    event.stopPropagation();
    event.stopPropagation();
    const inpBox = document.getElementById('editChapterNameInput');
    const titleSpan = document.getElementById(`cname_${id}`);
    inpBox.value = titleSpan.innerText;
    editableChapterId = id;
}
function saveEditedChanges() {
    const newName = document.getElementById(`editChapterNameInput`).value;
    fetch('/editChapter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName: newName, id: editableChapterId })
    }).then(response => response.json()).then((json) => {
        if (json.success) {
            const titleSpan = document.getElementById(`cname_${editableChapterId}`);
            titleSpan.innerText = newName;
        }
    }).catch((err) => {
        console.log(err);
    })
}
function deleteChapter(event, id) {
    event.stopPropagation();
    fetch('/deleteChapter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }).then(response => response.json()).then((json) => {
        if (json.success) {
            const div = document.getElementById(`chapter_${id}`);
            div.parentNode.removeChild(div);
        } else {
            alert('np')
        }
    })
}