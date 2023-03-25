const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

const aiRoutes = require('./routes/aiRoutes');
const homeRoutes = require('./routes/pageRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.use('/myai', aiRoutes);
app.use('/home', homeRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
