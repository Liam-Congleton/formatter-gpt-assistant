import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {askGPT3} from './main.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files from the current directory
app.use(express.static('.'));
app.use(express.json());

app.post('/api/ask-gpt', async (req, res) => {
  const question = req.body.question;
  const responseText = await askGPT3(question);
  res.json({ responseText });
});

app.listen(3000, () => console.log('Server listening on port 3000'));