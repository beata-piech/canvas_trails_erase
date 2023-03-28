async function sentence(){
	let textOpenAI= "";
	const data = {textOpenAI};
	const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
		};

	// fetch to send data as a POST to url: /api
	// and receive server's response with OpenAI's text
	const server_response = await fetch('/api', options);
	const response_json = await server_response.json();
	
	const to_sentence = response_json.client_data;
	document.getElementById('chat-sentense').innerHTML = to_sentence;
}
sentence()
	.catch ((error) => {
		console.error(error);
		document.getElementById('chat-sentense').innerHTML = 
		"We never know what is true and what is false, but it is worth to consider what could be or what should be possible in our changeable world!";
	});