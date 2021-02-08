window.addEventListener('DOMContentLoaded', () => {
	//! Que Event Listeners
	//Add a Que Event Listener
	document.querySelector('.que__add').addEventListener('click', () => {
		const input = document.querySelector('.new-question')
		const data = {
			question: input.value,
		}
		if (data.question !== '') {
			fetch('/questions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(res => {
					if (res.status === 200) return res.json()
				})
				.then(que => {
					console.log(que)
					const wrapper = document.createElement('div')
					wrapper.classList.add('que')
					wrapper.id = que.question.id

					const html = `
							<div class="que__user">
								<div class="que__buttons">
									<i class="far fa-edit que__edit" title="Edit Question"></i>
									<i class="far fa-trash-alt que__delete" title="Delete Question"></i>
								</div>
							</div>
							<div class="que__body">
								<a href="questions/${que.question.id}">
									<b>${que.question.body}</b>
								</a>
							</div>
							<div class="que__controls">
								<div class="que__votes">
									<div class="que__upvote" title="Upvote">
										<i class="far fa-volume-up">
											<p class="upClick">0</p>
										</i>
									</div>
									<div class="que__downvote" title="Downvote">
										<i class="far fa-volume-mute">
											<p class="downClick">0</p>
										</i>
									</div>
								</div>
								<a class="que__add-answer" href="/questions/${que.question.id}" title="Add Answer">
									<i class="far fa-plus">
										<p>Add Answer</p>
									</i>
								</a>
							</div>
					`
					wrapper.innerHTML = html
					const container = document.querySelector('.questions__que-list')
					container.prepend(wrapper)
				})
		}
	})

	//Toggle icon function
	function toggleIcons(i1, i2) {
		i1.classList.toggle('fa-edit')
		i1.classList.toggle('fa-save')
		i2.classList.toggle('fa-trash-alt')
		i2.classList.toggle('fa-times')
	}

	//Save changes Event Listener
	function updateQue(e) {
		const question = e.path[3].children[0]
		const newQue = question.children[0].value

		fetch(`/questions/${e.path[3].id.slice(4)}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ newQue }),
		}).then(res => {
			if (res.status === 200) {
				const editButton = e.target
				const deleteButton = e.path[1].children[1]
				toggleIcons(editButton, deleteButton)

				question.innerHTML = question.innerHTML.replace(/textarea>/g, 'b>')
				question.children[0].innerHTML = newQue

				editButton.title = 'Edit Question'
				editButton.removeEventListener('click', updateQue)
				editButton.addEventListener('click', editQue)

				deleteButton.title = 'Delete Question'
				deleteButton.removeEventListener('click', cancelQue)
				deleteButton.addEventListener('click', deleteQue)
			}
		})
	}

	//Cancel changes Event Listener
	function cancelQue(e) {
		const deleteButton = e.target
		const editButton = e.path[1].children[0]
		const question = e.path[3].children[0]

		toggleIcons(editButton, deleteButton)

		editButton.title = 'Edit Question'
		editButton.removeEventListener('click', updateQue)
		editButton.addEventListener('click', editQue)

		deleteButton.title = 'Delete Question'
		deleteButton.removeEventListener('click', cancelQue)
		deleteButton.addEventListener('click', deleteQue)

		question.innerHTML = question.innerHTML.replace(/textarea>/g, 'b>')
	}

	//Edit a Que Event Listener
	function editQue(e) {
		const editButton = e.target
		const deleteButton = e.path[1].children[1]
		const question = e.path[3].children[0]

		toggleIcons(editButton, deleteButton)

		editButton.title = 'Save Changes'
		editButton.removeEventListener('click', editQue)
		editButton.addEventListener('click', updateQue)

		deleteButton.title = 'Cancel Changes'
		deleteButton.removeEventListener('click', deleteQue)
		deleteButton.addEventListener('click', cancelQue)

		question.innerHTML = question.innerHTML.replace(/b>/g, 'textarea>')

		const id = e.path[1].id.slice(4)
	}
	document.querySelectorAll('.que__edit').forEach(b => {
		b.addEventListener('click', editQue)
	})

	//Delete a Que Event Listener
	function deleteQue(e) {
		const id = e.path[3].id.slice(4)
		fetch(`/questions/${id}`, {
			method: 'DELETE',
		}).then(res => {
			if (res.status === 200) e.path[3].remove()
		})
	}
	document.querySelectorAll('.que__delete').forEach(b => {
		b.addEventListener('click', deleteQue)
	})

	//! Vote Event Listeners
	function vote(e) {
		//Adjust path for click location
		const adj = 13 - e.path.length
		const votesPath = 3 - adj
		const votePath = 2 - adj
		const quePath = 5 - adj

		const voteDiv = e.path[votePath]
		const queId = e.path[quePath].id.slice(4)
		const voteType = voteDiv.classList[0].slice(5)
		const [upButton, downButton] = e.path[votesPath].children
		const isUnvote = !voteDiv.classList.contains('active') ? true : false

		if (isUnvote) {
			//Voted
			if (upButton.classList.contains('active') || downButton.classList.contains('active')) {
				//Edit Vote
				fetch(`/votes/${queId}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						isUpvote: voteType === 'upvote' ? true : false,
					}),
				}).then(res => {
					if (res.status === 200) {
						if (voteType === 'upvote') {
							upButton.classList.add('active')
							upButton.querySelector('p').innerHTML++
							downButton.classList.remove('active')
							downButton.querySelector('p').innerHTML--
						} else {
							upButton.classList.remove('active')
							upButton.querySelector('p').innerHTML--
							downButton.classList.add('active')
							downButton.querySelector('p').innerHTML++
						}
					}
				})
			} else {
				//Create Vote
				fetch('/votes', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						isUpvote: voteType === 'upvote' ? true : false,
						queId,
					}),
				}).then(res => {
					if (res.status === 200) {
						if (voteType === 'upvote') {
							upButton.querySelector('p').innerHTML++
							upButton.classList.add('active')
						} else {
							downButton.classList.add('active')
							downButton.querySelector('p').innerHTML++
						}
					}
				})
			}
		} else {
			//Unvoted
			//Delete Vote
			fetch(`/votes/${queId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(res => {
				if (res.status === 200) {
					if (voteType === 'upvote') {
						upButton.classList.remove('active')
						upButton.querySelector('p').innerHTML--
					} else {
						downButton.classList.remove('active')
						downButton.querySelector('p').innerHTML--
					}
				}
			})
		}
	}

	document.querySelectorAll('.que__upvote').forEach(v => {
		v.addEventListener('click', vote)
	})
	document.querySelectorAll('.que__downvote').forEach(v => {
		v.addEventListener('click', vote)
	})

	//! Answer Event Listeners
	// document.querySelectorAll('.que__add-answer').forEach(a => {
	// 	a.addEventListener('click', e => {
	// 		const adj = 12 - e.path.length
	// 		const path = 4 - adj
	// 		const queId = e.path[path].id.slice(4)
	// 		fetch('/answers', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Conent-Type': 'application/json',
	// 			},
	// 			body: {
	// 				questionId: queId,
	// 				body: 'TEST',
	// 			},
	// 		})
	// 	})
	// })
})
