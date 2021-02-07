	//Add Listener to Search Ques
	let ques = [];
	
	const searchBar = document.querySelector('#input')
	console.log(searchBar)
	searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
		const searchString = e.target.value.toLowerCase();
		const filteredQues = ques.filter ( que => {
		  return (
			que.body.toLowerCase().includes(searchString) 
		);
	  });
	    return displayResults
      }
    });

		const displayResults = (result) => {
			// const htmlString = result.map((result) => {
			return que.body
			  que.answer
			  que.authorId
			  que.aswer.authorId
			// })
		}

	const loadQues = async () => {
	  try {
	    const res = await fetch('/questions')
	    quesandAns = await res.josn();
	    displayResults(ques)
	    } catch(err) {
		console.erro(err)
	    }
    }

    loadQues();