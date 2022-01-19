const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')

dotenv.config()
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  redirectUri: 'http://www.example.com/callback'
});
spotifyApi.setAccessToken(process.env.myToken);
// spotifyApi
//   .clientCredentialsGrant()
//   .then(data => spotifyApi.setAccessToken(data.body['access_token']))
//   .catch(error => console.log('Something went wrong when retrieving an access token', error));


const app = express()
app.use((req,_,next)=>{
    console.log(req.url)
    next()
})
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/',(req,res)=>{
    res.render(__dirname+'/views/pages/home.ejs',{})
})
app.get('/artist-search',(req,res)=>{
    let artist = req.query.artist
        spotifyApi
        .searchArtists(artist)
        .then(data => {
            // console.log('The received data from the API: ', data.body.artists.items);
            let items = data.body.artists.items
            res.render(__dirname+ '/views/pages/results.ejs',{items})
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
        })


const PORT = 5050
app.listen(PORT,console.log('on: ',PORT))