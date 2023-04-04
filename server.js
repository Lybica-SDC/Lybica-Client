const path = require('path');
const express = require('express'); // npm installed
const compression = require('compression');

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/dist')));

// other configuration...
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`listening at http://localhost:${PORT}`);
