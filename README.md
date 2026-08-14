# 🎬 TollyRiddl

> A Telugu movie guessing game where players identify a movie using progressive clues.

🌐 **Live Demo:** https://tollyriddl-five.vercel.app/

💻 **GitHub:** https://github.com/githubindiaoff/tollyriddl

---

## 🎮 About

TollyRiddl is an interactive Telugu movie guessing game built with React and Vite.

Players are given a series of clues about a mystery movie and must identify it within a limited number of attempts.

The game currently uses a dataset of 50 Telugu movies.

---

## ✨ Features

- 🎲 Random mystery movie selection
- 👤 Hero clue
- 🎭 Genre clue
- 🎬 Director clue with image
- 🎵 Music director clue
- 📅 Release year clue
- 🔍 Movie search and autocomplete
- 🎯 Guess history
- ❤️ Limited attempts
- 🎬 New Game functionality
- 📱 Responsive interface
- 🌐 Publicly deployed web application

---

## 🕹️ How to Play

1. Open the game.
2. A mystery Telugu movie is selected.
3. Use the available clues to identify the movie.
4. Search for your guess using the search box.
5. Submit your guess.
6. Wrong guesses reveal additional clues.
7. Find the movie before running out of attempts!

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Vite
- CSS

### Data

- JSON-based movie dataset
- Movie/person metadata
- Local image assets

### Deployment

- GitHub
- Vercel

---

## 🧠 Key Concepts Used

This project helped me practice:

- React `useState`
- Component rendering
- Conditional rendering
- Array methods such as `find()` and `filter()`
- Random selection
- Search/autocomplete logic
- State management
- Event handling
- Dynamic UI updates
- Production builds
- Git and GitHub
- Web deployment

---

## 📂 Project Structure

```text
tollyriddl/
│
├── public/
│
├── scripts/
│   ├── buildMovieDataset.mjs
│   ├── fillMissingImages.mjs
│   ├── repairMovieDataset.mjs
│   └── validateMovieDataset.mjs
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── finalMovies.json
│   ├── generatedMovies.json
│   ├── movieTitles.js
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md