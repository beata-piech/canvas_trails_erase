// const express = require('express');
import express from 'express';
// const fetch = require("node-fetch");
import fetch from 'node-fetch';
import "dotenv/config.js";
// require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '6mb'}));

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`App listening on port ${port} `)
});

// set up route '/api' to recive the request from the client with data
app.post('/api', async (request, response) => {
    console.log("I got a request with:", request.body);
    const data = request.body;
    console.log("thats my data I recived from client:", data);

    // ----------- fetch the openAI
    const api_url = "https://api.openai.com/v1/completions";
    const prompt = "Create a computing sentence about AI, humans and the future";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`
    };
    const body = {
        "prompt": prompt,
        "model": "text-davinci-003",
        // Maximum number of tokens in the generated response
        "max_tokens": 100, 
        // control the creativity of the generated response
        "temperature": 0.8, 
        // create more diverse and imaginative response, avoid repeating the same words 
        "frequency_penalty": 1
        // generate responses that include specific keywords
        // "presence_penalty": 1
    };
    const chat_response = await fetch(api_url,{
		method: "POST",
		headers,
		body: JSON.stringify(body)
	} )
    const chat_data = await chat_response.json();
    console.log(chat_data.choices[0].text);
    const toChat = chat_data.choices[0].text;
    // ------------- end my fetch the openAI

    response.json({
        // status: 'sucesses',
        // client_data: request.body ,
        client_data: toChat ,
        // toChat
    });
})
