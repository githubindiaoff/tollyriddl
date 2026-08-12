import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const inputFile = path.join(
  ROOT,
  "src",
  "generatedMovies.json"
);

const outputFile = path.join(
  ROOT,
  "src",
  "repairedMovies.json"
);

const movies = JSON.parse(
  fs.readFileSync(inputFile, "utf8")
);

/*
  Verified music-director corrections for the movies
  that TMDB failed to populate consistently.
*/
const musicDirectorFixes = {
  "Mayabazar": "Ghantasala",
  "Aithe": "Kalyani Malik",
  "Manmadhudu": "Devi Sri Prasad",
  "Athadu": "Mani Sharma",
  "Shankar Dada M.B.B.S.": "Devi Sri Prasad",
  "Kick": "S. Thaman",
  "Kshanam": "Sricharan Pakala",
  "Goodachari": "Sricharan Pakala",
  "C/o Kancharapalem": "Sweekar Agasthi",
  "Agent Sai Srinivasa Athreya": "Mark K Robin",
  "Mathu Vadalara": "Kaala Bhairava",
  "Jathi Ratnalu": "Radhan"
};

/*
  We will correct this separately because TMDB matched
  the wrong Pelli Choopulu movie.
*/
const manualCorrections = {
  "Pelli Choopulu": {
    title: "Pelli Choopulu",
    year: 2016,
    genre: "Romance",
    hero: "Vijay Deverakonda",
    director: "Tharun Bhascker",
    musicDirector: "Vivek Sagar"
  },

  "Shankar Dada M.B.B.S.": {
    genre: "Comedy"
  }
};

const repairedMovies = movies.map((movie) => {
  const updatedMovie = { ...movie };

  // Apply music director fixes
  if (musicDirectorFixes[movie.title]) {
    updatedMovie.musicDirector =
      musicDirectorFixes[movie.title];
  }

  // Apply manual corrections
  if (manualCorrections[movie.title]) {
    Object.assign(
      updatedMovie,
      manualCorrections[movie.title]
    );
  }

  return updatedMovie;
});

fs.writeFileSync(
  outputFile,
  JSON.stringify(repairedMovies, null, 2),
  "utf8"
);

console.log("\n==============================");
console.log("🎬 DATASET REPAIR COMPLETE");
console.log("==============================");

console.log(
  `Original movies: ${movies.length}`
);

console.log(
  `Repaired movies: ${repairedMovies.length}`
);

console.log(
  `Saved to: ${outputFile}`
);