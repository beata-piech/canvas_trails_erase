import express from 'express';
import fetch from 'node-fetch';
import "dotenv/config.js";

const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '5mb'}));

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`App listening on port ${port} `)
});

    // set up route '/api' to receive client's request
app.post('/api', async (request, response) => {
    const data = request.body;
    console.log("Request check: ", data);

    //set up parameters to fetch resources from OpenAI
    const api_url = "https://api.openai.com/v1/completions";
    const prompt = "Create a sentence about AI, humans and the future";
    // const prompt = "How many chickens would it take to kill an elephant, if there was Godzilla Chicken?";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`
    };
    const body = {
        "prompt": prompt,
        "model": "text-davinci-003",
        "max_tokens": 100, 
        "temperature": 0.9, 
        // create more diverse and imaginative response, avoid repeating the same words 
        "frequency_penalty": 1
    };
    // fetch OpenAI with specified parameters
    const chat_response = await fetch(api_url,{
		method: "POST",
		headers,
		body: JSON.stringify(body)
	} )
    const chat_json = await chat_response.json();
    const text = chat_json.choices[0].text;
    
    //send response to the client with OpenAI's generated sentense
    response.json({
        client_data: text
    });
})
