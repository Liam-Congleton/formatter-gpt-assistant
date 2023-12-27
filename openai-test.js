import OpenAI from 'openai';

async function getAnimalFacts() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": "Tell me an interesting fact about animals."}]
    });
    console.log(chatCompletion.choices[0].message);
  } catch (error) {
    console.error('Error fetching animal facts:', error);
  }
}

getAnimalFacts();
