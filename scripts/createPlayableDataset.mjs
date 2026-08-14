import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const inputFile = path.join(
  ROOT,
  "src",
  "finalMovies.json"
);

const outputFile = path.join(
  ROOT,
  "src",
  "playableMovies.json"
);

const movies = JSON.parse(
  fs.readFileSync(inputFile, "utf8")
);

// Keep only movies that have BOTH clue images
const playableMovies = movies.filter(
  (movie) =>
    movie.heroImage &&
    movie.directorImage
);

fs.writeFileSync(
  outputFile,
  JSON.stringify(playableMovies, null, 2),
  "utf8"
);

console.log("\n==============================");
console.log("🎬 PLAYABLE DATASET CREATED");
console.log("==============================");
console.log(`Total movies: ${movies.length}`);
console.log(`Image-complete movies: ${playableMovies.length}`);
console.log(
  `Removed movies: ${movies.length - playableMovies.length}`
);
console.log(`Saved to: ${outputFile}\n`);

console.log("Removed:");

for (const movie of movies) {
  if (!movie.heroImage || !movie.directorImage) {
    console.log(`❌ ${movie.title}`);
  }
}
