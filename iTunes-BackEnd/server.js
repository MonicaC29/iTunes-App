//I created a basic Application of a backend using Node.js and Express that with the frontend interfaces with the iTunes Search API.
//This app allows users to search for content within the iTunes Store and display teh result.
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = 3001;

//Use helmet middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

//Use the cors middleware to enable Cors for all routes
app.use(cors());
//Middleware to parse JSON in the request body
app.use(bodyParser.json());

//Array to store favorites
let favorites = [];

app.get("/api/search", (req, res) => {
  //Extract the search term from request query parameters
  const { term } = req.query;
  //Construct the iTunes API URL with the search term
  const apiUrl = `https://itunes.apple.com/search?term=${term}`;

  //Make a GET request to the iTunes API
  https
    .get(apiUrl, (apiRes) => {
      let data = "";

      //Listen for data chunks in the response
      //I'm using chunk to refer a piece of data that is sent as part of a larger dataset. Data split into smaller pieces or chunks.
      apiRes.on("data", (chunk) => {
        //Accumulate each chunk of data
        data += chunk;
      });

      //Listen for the end of the response
      apiRes.on("end", () => {
        //Parse the accumulated data as JSON
        const jsonData = JSON.parse(data);
        //Send the JSON response to the client
        res.json(jsonData);
      });
    })

    //Handle errors in the GET request
    .on("error", (error) => {
      console.error(error);
      //Send a 404 Internal Server Error response to the client
      res.status(404).send("Internal Server Error");
    });
});

//Route to get the list of favorites
app.get("/api/favorites", (req, res) => {
  res.json(favorites);
});

//Route to add an item to the list of favorites
app.post("/api/favorites", (req, res) => {
  const { id, name } = req.body;
  const newFavorite = { id, name };
  favorites.push(newFavorite);
  res.json(newFavorite);
});

//Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
