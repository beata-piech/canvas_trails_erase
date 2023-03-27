async function sentence(){
	let textAI= "to be added";
	// document.getElementById('chat-sentense').innerHTML = sentence;
	const data = {textAI};
	const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				//I want that variable data to be sent as JSON:
				body: JSON.stringify(data)
		};

	//I modified the fetch function to send data as a POST to url: /api to my server
	//once the server recived the client request wit sent data, the client recives the server's response 
	//i.e. the fetch returns a promise that provides our response with server's sent response
	const server_response = await fetch('/api', options);
	const responsed_data = await server_response.json();
	// const responsed_data = await server_response.text();
	console.log(responsed_data.client_data);
	const toSentence = responsed_data.client_data;
	// const toChat = responsed_data.choices[0].text;
	// console.log(toChat);
	document.getElementById('chat-sentense').innerHTML = toSentence;
}
sentence()
	.catch ((error) => {
		console.error("There was a problem fetching the response:", error);
		document.getElementById('chat-sentense').innerHTML = "We never know what is true and what is false, but it is worth to consider what could be or what should be possible in our changeable world!";
	});