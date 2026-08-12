import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const inputFile = path.join(
  ROOT,
  "src",
  "finalMovieDataset.json"
);

const playableFile = path.join(
  ROOT,
  "src",
  "playableMovies.json"
);

const reviewFile = path.join(
  ROOT,
  "src",
  "reviewMovies.json"
);

const movies = JSON.parse(
  fs.readFileSync(inputFile, "utf8")
);

// Fields that our game absolutely needs
const requiredFields = [
  "title",
  "year",
  "genre",
  "hero",
  "heroImage",
  "director",
  "directorImage",
  "musicDirector"
];

function validateMovie(movie) {
  const missingFields = [];

  for (const field of requiredFields) {
    const value = movie[field];

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      missingFields.push(field);
    }
  }

  return missingFields;
}

const playableMovies = [];
const reviewMovies = [];

for (const movie of movies) {
  const missingFields = validateMovie(movie);

  if (missingFields.length === 0) {
    playableMovies.push(movie);
  } else {
    reviewMovies.push({
      ...movie,
      missingFields
    });
  }
}

fs.writeFileSync(
  playableFile,
  JSON.stringify(playableMovies, null, 2),
  "utf8"
);

fs.writeFileSync(
  reviewFile,
  JSON.stringify(reviewMovies, null, 2),
  "utf8"
);

console.log("\n==============================");
console.log("🎬 TOLLYRiddl DATASET REPORT");
console.log("==============================");

console.log(`Total movies: ${movies.length}`);
console.log(`✅ Playable: ${playableMovies.length}`);
console.log(`⚠️ Needs review: ${reviewMovies.length}`);

console.log("\n------------------------------");
console.log("⚠️ MOVIES NEEDING REVIEW");
console.log("------------------------------");

if (reviewMovies.length === 0) {
  console.log("🎉 Every movie is fully playable!");
} else {
  for (const movie of reviewMovies) {
    console.log(
      `\n${movie.title}`
    );

    console.log(
      `Missing: ${movie.missingFields.join(", ")}`
    );
  }
}

console.log("\n------------------------------");
console.log("📁 OUTPUT FILES");
console.log("------------------------------");

console.log(
  `Playable: ${playableFile}`
);

console.log(
  `Review:   ${reviewFile}`
);