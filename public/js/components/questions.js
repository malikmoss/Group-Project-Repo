window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.que__add').addEventListener('click', () => {
		const data = {
			question: document.querySelector('.new-question').value,
		}

		fetch('/questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
	})
	document.querySelectorAll('.que__edit').forEach(b => {
		b.addEventListener('click', e => {
			const id = e.path[1].id.slice(4)
		})
	})
	document.querySelectorAll('.que__delete').forEach(b => {
		b.addEventListener('click', e => {
			console.log()
			const id = e.path[3].id.slice(4)
			fetch(`/questions/${id}`, {
				method: 'DELETE',
			}).then(res => console.log(res))
		})
	})
})
