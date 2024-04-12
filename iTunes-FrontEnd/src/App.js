import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import iTunes from "./iTunes.jpeg";

function App() {
  //State variables to manage search term, search results favorites and searchError.
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);

  //Function to handle the search button click
  const handleSearch = () => {
    //Set loading to true to indicate the start of the API request
    setLoading(true);

    axios
      .get(`http://localhost:3001/api/search?term=${searchTerm}`)
      .then((response) => {
        setSearchResults(response.data.results);
        setSearchError(null);
      })
      .catch((error) => {
        console.error("Error in API request:", error);
        setSearchError("An error occurred during the search.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Function to add an item to the favorites list
  const addToFavorites = (item) => {
    axios
      .post("http://localhost:3001/api/favorites", item)
      .then(() => setFavorites([...favorites, item]))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container" data-testid="render">
      <h1 className="title">iTunes App</h1>
      <img src={iTunes} alt="iTunes" className="iTunes" />
      <div className="search-container">
        <input
          className="input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div className="results-container">
        {/*Search Results*/}
        <h2>Search Result</h2>
        <ul className="result-list">
          {searchResults.map((result) => (
            <li key={result.trackId} className="result-item">
              <span className="track-name">{result.trackName}</span>
              <button
                className="favorite-button"
                onClick={() => addToFavorites(result)}
              >
                Add to favorites
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="results-container">
        {/*Favorites*/}
        <h2>Favorites</h2>
        <ul className="result-list">
          {favorites.map((favorite) => (
            <li key={favorite.id} className="result-item">
              {favorite.trackName}
            </li>
          ))}
        </ul>
      </div>

      {/*Display error message*/}
      {searchError && (
        <div className="error-message" style={{ color: "red" }}>
          {searchError}
        </div>
      )}
    </div>
  );
}

export default App;
