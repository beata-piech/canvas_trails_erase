Javascript Canvas element with 2D rendering contexts created to provide two drawing surfaces. One context (named drawRandomCtx) has been used to generate random objects - Trails. Second one (drawUserCtx) - to allow the user to draw in it. Both of them work as a eraser to rub off the front image and uncover the back-side of the main container whitch also contains another image and a sentence provided by OpenAI's text-generating language model "davinci-003".

The drawUserCtx context enables the user to draw on the canvas through mouse and touch events.

The "See it better" button (top right corner/or top center) can be used to clear both contexts, stop animation and uncover the back img and blockquote element. The blockquote elem contains a short text generated with https://api.openai.com/v1/completions

The OpenAI's text-generating language model called "davinci-003" is prompted to provide a sentence about AI, people and the future. The leveraged parameters have been set to generate a response with a maximum of 100 tokens, penalize the likelihood of repeating the same words or phrases and prioritize generating more diverse and creative responses.
