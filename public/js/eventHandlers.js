window.addEventListener('DOMContentLoaded', () => {
	const back = document.querySelector('.button__back')
	if (back) {
		back.addEventListener('click', () => {
			history.go(-1)
		})
	}
})
