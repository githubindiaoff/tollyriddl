import fs from "fs";
import path from "path";

const API_TOKEN = process.env.TMDB_TOKEN;

if (!API_TOKEN) {
  console.error("❌ TMDB_TOKEN is missing from .env");
  process.exit(1);
}

const ROOT = process.cwd();

const titlesFile = path.join(ROOT, "src", "movieTitles.js");
const outputFile = path.join(
  ROOT,
  "src",
  "generatedMovies.json"
);

// Read our movieTitles.js
const source = fs.readFileSync(titlesFile, "utf8");

// Extract quoted movie titles
const titles = [
  ...source.matchAll(/"([^"]+)"/g)
].map((match) => match[1]);

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  accept: "application/json"
};

async function tmdbFetch(url) {
  const response = await fetch(url, {
    headers
  });

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function searchMovie(title) {
  const url =
    "https://api.themoviedb.org/3/search/movie" +
    `?query=${encodeURIComponent(title)}` +
    "&include_adult=false" +
    "&language=en-US";

  const data = await tmdbFetch(url);

  if (!data.results || data.results.length === 0) {
    return null;
  }

  // Prefer Telugu results
  const teluguResult = data.results.find(
    (movie) => movie.original_language === "te"
  );

  return teluguResult || data.results[0];
}

async function getMovieDetails(movieId) {
  const url =
    `https://api.themoviedb.org/3/movie/${movieId}` +
    "?language=en-US&append_to_response=credits";

  return tmdbFetch(url);
}

function getDirector(crew) {
  return (
    crew.find(
      (person) =>
        person.department === "Directing" &&
        person.job === "Director"
    ) || null
  );
}

function getMusicDirector(crew) {
  return (
    crew.find(
      (person) =>
        person.job === "Original Music Composer"
    ) ||
    crew.find(
      (person) =>
        person.department === "Sound" &&
        person.job?.toLowerCase().includes("composer")
    ) ||
    null
  );
}

function imageUrl(profilePath) {
  if (!profilePath) {
    return "";
  }

  return `https://image.tmdb.org/t/p/w500${profilePath}`;
}

async function buildDataset() {
  console.log(`🎬 Processing ${titles.length} movies...\n`);

  const movies = [];

  for (const title of titles) {
    try {
      console.log(`🔎 Searching: ${title}`);

      const searchResult = await searchMovie(title);

      if (!searchResult) {
        console.log(`   ⚠️ Not found: ${title}\n`);
        continue;
      }

      const details = await getMovieDetails(
        searchResult.id
      );

      const director = getDirector(
        details.credits?.crew || []
      );

      const musicDirector = getMusicDirector(
        details.credits?.crew || []
      );

      const hero =
        details.credits?.cast?.[0] || null;

      const movie = {
        title: details.title,
        tmdbId: details.id,
        year: details.release_date
          ? Number(details.release_date.slice(0, 4))
          : null,

        genre:
          details.genres?.[0]?.name || "",

        hero: hero?.name || "",
        heroImage: imageUrl(hero?.profile_path),

        director: director?.name || "",
        directorImage: imageUrl(
          director?.profile_path
        ),

        musicDirector:
          musicDirector?.name || "",

        posterImage: details.poster_path
          ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
          : ""
      };

      movies.push(movie);

      console.log(`   ✅ ${movie.title}`);

      if (hero) {
        console.log(`      Hero: ${hero.name}`);
      }

      if (director) {
        console.log(
          `      Director: ${director.name}`
        );
      }

      if (musicDirector) {
        console.log(
          `      Music: ${musicDirector.name}`
        );
      }

      console.log("");

      // Be gentle with the API
      await new Promise((resolve) =>
        setTimeout(resolve, 250)
      );

    } catch (error) {
      console.error(
        `   ❌ Failed: ${title}`,
        error.message
      );
    }
  }

  fs.writeFileSync(
    outputFile,
    JSON.stringify(movies, null, 2),
    "utf8"
  );

  console.log("\n==============================");
  console.log("🎉 DATASET BUILD COMPLETE");
  console.log("==============================");
  console.log(`Movies found: ${movies.length}`);
  console.log(`Saved to: ${outputFile}`);
}

buildDataset();