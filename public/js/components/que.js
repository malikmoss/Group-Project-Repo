window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.add-answer').addEventListener('click', e => {
        // const adj = 12 - e.path.length
        // const path = 4 - adj
        // const queId = e.path[path].id.slice(4)
        fetch('/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: {
                questionId: queId,
                body: document.querySelector('#addAnswer').value
            }
        })
    })
})
