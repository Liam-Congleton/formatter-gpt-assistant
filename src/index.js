import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files from the current directory
app.use(express.static('.'));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});