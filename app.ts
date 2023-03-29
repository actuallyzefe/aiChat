import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { aiRoutes } from './routes/aiRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SERVING STATIC FILES

app.use('/myai', aiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
