import { useState } from "react";
import movies from "./finalMovies.json";
import "./App.css";

function App() {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [attempts, setAttempts] = useState(7);
  const [clueLevel, setClueLevel] = useState(1);
  const [guesses, setGuesses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  // Pick a random mystery movie when the game starts
  const [mysteryMovie, setMysteryMovie] = useState(() => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  });

  function handleGuess() {
    if (attempts === 0 || gameWon) {
      return;
    }

    const foundMovie = movies.find(
      (movie) =>
        movie.title.toLowerCase() === guess.trim().toLowerCase()
    );

    // Movie doesn't exist
    if (!foundMovie) {
      setResult("❌ Movie not found");
      return;
    }

    // Same movie guessed twice
    if (guesses.includes(foundMovie.title)) {
      setResult("⚠️ You already guessed this movie");
      return;
    }

    // Add guess to history
    setGuesses((previousGuesses) => [
      ...previousGuesses,
      foundMovie.title
    ]);

    // Clear search box
    setGuess("");
    setSuggestions([]);

    // Correct answer
    if (foundMovie.title === mysteryMovie.title) {
      setGameWon(true);
      setResult("🎉 Correct! You found today's movie!");
      return;
    }

    // Wrong valid guess
    setAttempts((previousAttempts) => previousAttempts - 1);

    setResult(`You guessed ${foundMovie.title}`);

    // Reveal next clue
    setClueLevel((previousClueLevel) =>
      Math.min(previousClueLevel + 1, 5)
    );
  }

  function startNewGame() {
    let randomMovie;

    do {
      const randomIndex = Math.floor(
        Math.random() * movies.length
      );

      randomMovie = movies[randomIndex];
    } while (
      movies.length > 1 &&
      randomMovie.title === mysteryMovie.title
    );

    setMysteryMovie(randomMovie);
    setGuess("");
    setResult("");
    setAttempts(7);
    setClueLevel(1);
    setGuesses([]);
    setSuggestions([]);
    setGameWon(false);
  }

  return (
    <div className="game">
      <div className="card">

        <h1 className="logo">
          🎬 TollyRiddl
        </h1>

        <p className="subtitle">
          Guess today's Telugu movie!
        </p>

        {/* SEARCH */}

        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder={
              gameWon
                ? "🎉 You solved today's movie!"
                : "🔍 Search for a movie..."
            }
            value={guess}
            disabled={gameWon}
            onChange={(event) => {
              const value = event.target.value;

              setGuess(value);

              if (value.trim() === "") {
                setSuggestions([]);
                return;
              }

              const filteredMovies = movies
                .filter((movie) =>
                  movie.title
                    .toLowerCase()
                    .includes(value.toLowerCase())
                )
                .slice(0, 5);

              setSuggestions(filteredMovies);
            }}
          />

          {suggestions.length > 0 && !gameWon && (
            <div className="suggestions">
              {suggestions.map((movie) => (
                <button
                  className="suggestion-item"
                  key={movie.title}
                  onClick={() => {
                    setGuess(movie.title);
                    setSuggestions([]);
                  }}
                >
                  {movie.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GUESS BUTTON */}

        <button
          className="guess-button"
          onClick={handleGuess}
          disabled={
            attempts === 0 ||
            gameWon ||
            guess.trim() === ""
          }
        >
          GUESS
        </button>

        {/* RESULT */}

        {result && (
          <p className="result">
            {result}
          </p>
        )}

        {/* ATTEMPTS */}

        <p className="attempts">
          {attempts} attempts remaining
        </p>

        {/* CLUES */}

        <div className="clues">

          {/* CLUE 1 — HERO */}

          {mysteryMovie.heroImage ? (
  <img
    src={mysteryMovie.heroImage}
    alt={mysteryMovie.hero}
    className="clue-image"
  />
) : (
  <div className="image-placeholder">
    👤
  </div>
)}

          {/* CLUE 2 — GENRE */}

          {clueLevel >= 2 && (
            <div className="clue">
              <h3>🎭 Genre</h3>

              <p>
                {mysteryMovie.genre}
              </p>
            </div>
          )}

          {/* CLUE 3 — DIRECTOR */}

          {mysteryMovie.directorImage ? (
  <img
    src={mysteryMovie.directorImage}
    alt={mysteryMovie.director}
    className="clue-image"
  />
) : (
  <div className="image-placeholder">
    🎬
  </div>
)}

          {/* CLUE 4 — MUSIC DIRECTOR */}

          {clueLevel >= 4 && (
            <div className="clue">
              <h3>🎵 Music Director</h3>

              <p>
                {mysteryMovie.musicDirector}
              </p>
            </div>
          )}

          {/* CLUE 5 — RELEASE YEAR */}

          {clueLevel >= 5 && (
            <div className="clue">
              <h3>📅 Release Year</h3>

              <p>
                {mysteryMovie.year}
              </p>
            </div>
          )}

        </div>

        {/* GUESS HISTORY */}

        {guesses.length > 0 && (
          <div className="guess-history">
            <h3>🎯 Your Guesses</h3>

            <div className="guess-list">
              {guesses.map((movie, index) => (
                <div
                  className="guess-item"
                  key={`${movie}-${index}`}
                >
                  <span className="guess-number">
                    {index + 1}
                  </span>

                  <span className="guess-name">
                    {movie}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEW GAME */}

        <button
          className="new-game-button"
          onClick={startNewGame}
        >
          🎬 NEW GAME
        </button>

      </div>
    </div>
  );
}

export default App;