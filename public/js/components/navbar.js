window.addEventListener('DOMContentLoaded', () => {
//Add Listener to Search Ques
	let ques = [];

	// const loadQues = async () => {
	// 	try {
	// 	  const res = await fetch(`/questions/search/?q=${}`)
	// 	  ques = await res.json();
	// 	  displayResults(ques)
	// 	  } catch(err) {
	// 	  console.error(err)
	// 	  }
	//   }

	// const searchBar = document.querySelector('.navbar__search')
	const input = document.getElementById('searchInput')
	input.addEventListener('keyup', (e) => {
		if (!input.value.trim()) return;
		if (e.key === 'Enter') {
			window.location.href = `/questions/search?q=${input.value}`;
		}
    });

	// 	const displayResults = (result) => {
	// 		// const htmlString = result.map((result) => {
	// 		return que.body
	// 		  que.answer
	// 		  que.authorId
	// 		  que.aswer.authorId
	// 		// })
	// 	}
})
