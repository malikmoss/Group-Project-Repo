window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.add-que').addEventListener('click', () => {
		fetch('/questions')
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
