const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs'); // Set EJS as the view engine

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('layout', { title: 'Dictionary App' });
});

app.post('/lookup', async (req, res) => {
  const apiKey = 'e45886e4-635a-4511-9c42-689e3b19f204';
  const word = req.body.word;
  const apiUrl = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('API request failed');
    const definitions = await response.json();
    shortDef = definitions[0].shortdef
    console.log(shortDef)
    res.render('result', { title: 'Dictionary Result', result: { word, apiUrl }, definitions: shortDef });
    // res.json({
    //   word,
    //   apiUrl,
    //   definitions,
    // });
  } catch (error) {
    res.render('result', { title: 'Dictionary Result', result: null });
  }
});


app.listen(port, () => {
  console.log(`Server is running on: http://127.0.0.1:${port}`);
});


/* async function callDictionary(word) {
  const apiKey = 'e45886e4-635a-4511-9c42-689e3b19f204'
  const apiUrl = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`
  try {
    const response = await fetch(apiUrl)
    if ( !response.ok ) throw new Error("broke")
    const data = await response.json()
    if ( data === [] ) throw new Error("broke")
    const shortDef = data[0].shortdef
    console.clear()
    console.log('-'.repeat(56))
    console.log(`word input: \n${word}`)
    console.log('-'.repeat(56))
    console.log(`Api call: \n${apiUrl}`)
    console.log('-'.repeat(56))
    console.log(`dictionary short definitions:`)
    shortDef.forEach((def, index) => console.log(`${index}: ${def}`))
    console.log('-'.repeat(56))
  }
  catch (error) {
    console.log(error)
  }
}

// Check if a command-line argument was provided
if (process.argv.length < 3) {
  console.log('Please provide a word as a command-line argument.')
  process.exit(1) // Exit the script with an error code
}

const userWord = process.argv[2]

callDictionary(userWord) */