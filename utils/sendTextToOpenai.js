const sendTextToOpenAi = async (userText) => {
	const response = await fetch("/api/openai", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ userText }),
	});
	const { message } = await response.json();
	return message;
};

export default sendTextToOpenAi