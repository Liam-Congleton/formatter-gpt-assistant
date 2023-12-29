import express from 'express';
import { askGPT3 } from './main.js';

const app = express();
app.use(express.json());

app.post('/api/ask-gpt', async (req, res) => {
  try {
    const question = req.body.question;
    const responseText = await askGPT3(question);
    res.json({ responseText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));