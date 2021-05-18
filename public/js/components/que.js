window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.add-answer').addEventListener('click', e => {
		try {
			document.querySelector('.answers-empty').remove()
		} catch {
			null
		}
		const data = {
			queId: document.querySelector('.container__que').id.slice(4),
			text: document.querySelector('.answer-text').value,
		}
		if (data.text !== '') {
			fetch('/answers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(res => {
					if (res.status === 200) return res.json()
				})
				.then(answer => {
					const wrapper = document.createElement('div')
					wrapper.classList.add('answer')
					wrapper.id = `ans-${answer.id}`
					const html = `
						<div class="answer__user">
							<p>
								Answered by <b>${answer.username}</b>
							</p>
							<div class="answer__user-buttons">
								<i class="far fa-trash-alt answer__delete" title="Delete Answer"></i>
							</div>
						</div>
						<div class="answer__body">
							<p>${answer.answer.body}</p>
						</div>
					`
					wrapper.innerHTML = html
					document.querySelector('.answer-text').value = ''
					document.querySelector('.container__answers').prepend(wrapper)
				})
		}
	})
	document.querySelector('.clear-answer').addEventListener('click', e => {
		document.querySelector('.answer-text').value = ''
	})
})
