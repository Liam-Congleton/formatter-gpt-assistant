import OpenAI from 'openai';
import readline from 'readline';
//import AHF-functions from 'AHF-functions'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const positiveKeywords = ["success", "happy", "good"];
const negativeKeywords = ["fail", "apple", "bad"];

function functionPositiveResponse() {
  console.log("Positive response function called!");
}

function functionNegativeResponse() {
  console.log("Negative response function called!");
}

async function askGPT3(question) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": question}]
    });

    const responseText = chatCompletion.choices[0].message.content;
    console.log("GPT-3 Response:", responseText);

    if (positiveKeywords.some(keyword => responseText.includes(keyword))) {
      functionPositiveResponse();
    } else if (negativeKeywords.some(keyword => responseText.includes(keyword))) {
      functionNegativeResponse();
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

rl.question('Ask GPT-3 anything: ', (input) => {
  askGPT3(input).then(() => {
    rl.close();
  });
});
