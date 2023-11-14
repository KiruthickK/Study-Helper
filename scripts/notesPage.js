function loadNote(id) {
    const ch = id.id.split('_');
    const note_id = ch[1];
    console.log(note_id)
}
function showForm() {
    document.getElementById('notes_input_form').classList.remove('d-none')
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
            div.classList.add('row', 'rounded', 'bg-secondary', 'p-3')
            div.innerHTML = `<strong>
            Notes ID: 
                            </strong>
                                ${json.id} 
                            <strong>
                            <span id="notes_id_${json.id}">
                                Notes topic: 
                            </span>
                            </strong>
                            <span id="note_topic_${json.id}">
                                ${newNotesTitle}
                            </span>
                            <strong>
                                Notes
                            </strong>
                            <span id="note_notes_${json.id}">
                                ${notes}
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