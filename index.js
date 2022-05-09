const express = require('express');
const datastore = require('nedb');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log ('i\'m all ears'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const drafts = new datastore({ filename: 'tweet_drafts.db', autoload: true });
const database = new datastore({ filename: 'hashtags.db', autoload: true });

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

app.post('/drafts', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    drafts.insert(data);
    response.json(data);
});
