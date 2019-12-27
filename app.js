const express = require('express');
const fetch = require('node-fetch');

const app = express();
const GHOST_KEY = '001a4d585424b95feef78fad89';

app.use(express.static('public'));
app.get('/', (req,res) => {
  res.sendFile('index.html', {root: 'public'});
});

app.get('/content/:tag/:slug', (req,res) => {
  res.sendFile('content.html', {root: 'public'});
});

app.get('/api/:tag', (req, res) => {
  url = `https://petespeth.xyz/ghost/api/v3/content/posts/?key=${GHOST_KEY}`;
  url += '&fields=title,slug,published_at,custom_excerpt';
  url += `&filter=tag:${req.params.tag}`;

  fetch(url)
  .then(resp => resp.json())
  .then(json => res.send(json))
  .catch(error => res.sendStatus(500));
});

app.get('/api/content/:tag/:slug', (req,res) => {
  url = `https://petespeth.xyz/ghost/api/v3/content/posts/slug/${req.params.slug}?key=${GHOST_KEY}`;
  url += '&fields=title,slug,published_at,html';
  url += `&filter=tag:${req.params.tag}`;

  fetch(url)
  .then(resp => resp.json())
  .then(json => res.send(json))
  .catch(error => res.sendStatus(500));
});

app.listen(3000);
