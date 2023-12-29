import openai from './api/openai.js';
import { positiveKeywords, negativeKeywords } from './utils/keywords.js';
import functionPositiveResponse from './responses/positiveResponse.js';
import functionNegativeResponse from './responses/negativeResponse.js';

export async function askGPT3(question) {
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

  return responseText;
}