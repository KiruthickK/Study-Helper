function loadChapter(id) {
    const chapter_id = id.id.charAt(id.id.length - 1);
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

    });
}