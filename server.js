const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    timestamp: new Date().toISOString()
  };

  // Read existing data or create an empty array
  let data = [];
  if (fs.existsSync('data.json')) {
    const fileData = fs.readFileSync('data.json');
    if (fileData.length > 0) {
      data = JSON.parse(fileData);
    }
  }

  // Add new entry
  data.push(userData);

  // Save updated data
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

  res.send('<h2>Thank you! Your data has been saved.</h2><a href="/">Go Back</a>');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
