const dotenv = require('dotenv')
const express = require('express')

dotenv.config()
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  redirectUri: 'http://www.example.com/callback'
});

app = express()
const PORT = 5050
app.listen(PORT,console.log('on: ',PORT))