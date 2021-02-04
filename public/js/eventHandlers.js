window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.add-que').addEventListener('click', () => {
		const question = document.querySelector('.new-question')
		fetch('/questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(question.value),
		})
	})
	document.querySelectorAll('.edit-que').forEach(b => {
		b.addEventListener('click', e => {
			const id = e.path[1].id.slice(4)
		})
	})
	document.querySelectorAll('.delete-que').forEach(b => {
		b.addEventListener('click', e => {
			const id = e.path[1].id.slice(4)
		})
	})
})
