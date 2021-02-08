window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.add-answer').addEventListener('click', e => {
		const data = {
			queId: document.querySelector('.container__que').id.slice(4),
			text: document.querySelector('#addAnswer').value,
        }
        if (data !== '') {
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
                document.querySelector('.allAnswers').innerHTML++
                button.classList.add(data)


				// console.log(data)
            })
        }
	})
})
