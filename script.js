let open_resonse;

let chat = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how can I help you today" },
];

async function chatUsearAdd(feeling, question) {
  chat.push({
    role: "user",
    content:
      "my happiness from 0-10 is " + feeling + " . my input is: " + question,
  });
}

async function chatAssistentAdd(res) {
  chat.push({ role: "assistant", content: res });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-LLDtZIQbt300rIyi";
  let part3 = "Bm5LT3BlbkFJwntYQJzMl3xlkgLt63pM";

  let allParts = part1 + part2 + part3;

  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responsedata = await response.json();
      const messages = responsedata.choices[0].message.content;

      chatAssistentAdd(messages);
      const speech = new SpeechSynthesisUtterance(messages);
      speechSynthesis.speak(speech);
      return messages;
    }
  } catch (error) {
    console.log(error);
  }
}
