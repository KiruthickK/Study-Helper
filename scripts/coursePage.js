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
        }
    }).catch((err) => {
        console.log(err)
    });
}