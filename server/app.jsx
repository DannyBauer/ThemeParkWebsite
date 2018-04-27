/* Place server code here */
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import request from 'request'
import axios from 'axios'
import Twit from 'twit'

/* To serve up client code */
import { Server } from 'http'

import MongoClient from 'mongodb'

const url = 'mongodb://127.0.0.1:27017';
const db_name = 'themepark';

const config = {
  consumer_key:         'TFx3fTKAOJPmPfu6dYl8oNfgR',
  consumer_secret:      '78y3OWR9bHrFq35iLLbUfDU7qeegXB8NPsODqka7dcshgWKNyU',
  access_token:         '985279784816177152-ypSZ4FAVgzXMlDcX23o2zd7gaRUwl7E',
  access_token_secret:  'QO5EfoT7bUbydFmaxmtVIvtIxADrKPmaqtEkfPFnh9HHB',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
};

const twitterRequest = new Twit(config);

const app = express();
app.use(cors()); /* Cross Origin Access */

/* serves up index.html from dist */
app.use(express.static(path.join(__dirname, "../dist/client")));

/* Allows json responses from api endpoints */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => { /* Serve our html from the production server */
    res.sendFile(path.resolve('dist/server/public/index.html'));
});

app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=5bd22b268b6fa7845de84a3ff6faece4")
        .then((response) => {
          res.send(response.data);
        }).catch((error) => {
          console.log("Error: ", error);
          res.status(404);
        });
});

app.get('/forecast/:city', (req, res) => {
  const city = req.params.city;
  axios.get("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=5bd22b268b6fa7845de84a3ff6faece4")
      .then((response) => {
        res.send(response.data);
      }).catch((error) => {
        console.log("Error: ", error);
        res.status(404);
      });
});


app.get('/tweets', (req, res) => {
    twitterRequest.get('search/tweets', {q:'Ledgards Theme Park'})
                  .then(response => {
                    res.send(response.data);
                  })
                  .catch(error => {
                    console.log(error);
                    res.status(404);
                  });
});

app.get('/rollercoasters', (req, res) => {
    (async () => {
      let client;
      try {
        client = await MongoClient.connect(url);

        const rollercoasters = await client.db(db_name)
                                  .collection('rollercoasters')
                                  .find({})
                                  .toArray();
        res.send(rollercoasters);
      } catch (err) {
        console.log(err);
        res.status(500);
      }
    })();
});

app.use(express.static('public'))


app.get('/hello', (req, res) => {
	res.send("Hello World (from api)!");
});

app.get('/images/:image', (req, res) => { /* Serve our html from the production server */
    const image = req.params.image;
    res.sendFile(path.resolve('server/public/' + image));
});

app.listen(7777,() => { console.log("Started listening on port", 7777); });
