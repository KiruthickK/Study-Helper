function loadNote(id) {
    const ch = id.id.split('_');
    const note_id = ch[1];
    console.log(note_id)
}
function showForm() {
    document.getElementById('notes_input_form').classList.remove('d-none')
}
function addCourseCancel() {
    document.getElementById('notes_input_form').classList.add('d-none')
}
function addNotes() {
    const newNotesTitle = document.getElementById('new_notes_name').value;
    const notes = document.getElementById('notes_content').value;
    fetch('/createNotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newNotesTitle: newNotesTitle, notes: notes })
    }).then(response => response.json()).then((json) => {
        if (json.success) {
            // add this to the page
            const container = document.getElementById('mainDiv');
            const div = document.createElement('div');
            div.id = 'note_' + json.id;
            console.log(div.id)
            div.classList.add('m-5', 'rounded', 'bg-light', 'p-3', 'position-relative')
            div.innerHTML = `
            <button class="btn btn-info position-relative  m-1" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onclick="editNotes(event,  ${json.id})">Edit</button>
            <button onclick="DeleteThisNotes(event, ${json.id})" class="btn btn-danger position-absolute top-0 end-0 m-1">Delete</button>
                            <strong id="note_topic_${json.id}">
                                ${newNotesTitle}
                            </strong>
                            <br>
                            <strong>
                                Notes:
                            </strong>
                            <span id="note_notes_${json.id}">
                                ${notes}
                            </span>
                            `;
            div.addEventListener('click', function (event) {
                loadCourse(event.target);
            });
            container.appendChild(div)
            addCourseCancel();
        } else if (json.failed) {
            alert('Something went wrong while creating a new user')
        }
    }).catch(err => console.log(err));
}
let editableId = -1;
function editNotes(event, id) {
    event.stopPropagation();
    const topicInput = document.getElementById('editNotesTopicInput');
    const contentInput = document.getElementById('edit_notes_content');
    const clicked_topic = document.getElementById(`note_topic_${id}`);
    const clicked_content = document.getElementById(`note_notes_${id}`);
    topicInput.value = clicked_topic.innerText;
    contentInput.value = clicked_content.innerText;
    editableId = id;
    console.log(id)
}
function saveEditedChanges() {
    console.log(editableId)
    const changedTopic = document.getElementById('editNotesTopicInput').value;
    const changedContent = document.getElementById('edit_notes_content').value;
    fetch('/editNotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: editableId, topic: changedTopic, notes: changedContent })
    }).then(response => response.json()).then((json) => {
        if (json.success) {
            document.getElementById(`note_topic_${editableId}`).innerText = changedTopic;
            document.getElementById(`note_notes_${editableId}`).innerText = changedContent;
        } else {
            alert('Something went wrong!' + json.success);
        }
    })
}
function DeleteThisNotes(event, id) {
    event.stopPropagation();
    fetch('/deleteNotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })

    }).then(response => response.json()).then((json) => {
        if (json.success) {
            const div = document.getElementById(`note_${id}`);
            div.parentNode.removeChild(div);
        } else {
            alert('Cant delete this notes')
        }
    })
}