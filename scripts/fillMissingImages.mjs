import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const inputFile = path.join(
  ROOT,
  "src",
  "repairedMovies.json"
);

const outputFile = path.join(
  ROOT,
  "src",
  "finalMovies.json"
);

const API_TOKEN = process.env.TMDB_TOKEN;

if (!API_TOKEN) {
  console.error("❌ TMDB_TOKEN is missing");
  process.exit(1);
}

const movies = JSON.parse(
  fs.readFileSync(inputFile, "utf8")
);

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  accept: "application/json",
};

async function tmdbFetch(url) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `TMDB ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

async function findPersonImage(personName) {
  const url =
    "https://api.themoviedb.org/3/search/person" +
    `?query=${encodeURIComponent(personName)}` +
    "&include_adult=false" +
    "&language=en-US";

  const data = await tmdbFetch(url);

  if (!data.results || data.results.length === 0) {
    return "";
  }

  // Prefer an exact name match
  const exactMatch =
    data.results.find(
      (person) =>
        person.name.toLowerCase() ===
        personName.toLowerCase()
    ) || data.results[0];

  if (!exactMatch.profile_path) {
    return "";
  }

  return `https://image.tmdb.org/t/p/w500${exactMatch.profile_path}`;
}

async function main() {
  console.log("🎬 Filling missing person images...\n");

  const finalMovies = [];

  for (const movie of movies) {
    const updatedMovie = { ...movie };

    // HERO IMAGE
    if (!updatedMovie.heroImage && updatedMovie.hero) {
      console.log(
        `👤 Searching hero: ${updatedMovie.hero}`
      );

      updatedMovie.heroImage =
        await findPersonImage(updatedMovie.hero);

      if (updatedMovie.heroImage) {
        console.log("   ✅ Hero image found");
      } else {
        console.log("   ⚠️ Hero image still missing");
      }
    }

    // DIRECTOR IMAGE
    if (
      !updatedMovie.directorImage &&
      updatedMovie.director
    ) {
      console.log(
        `🎬 Searching director: ${updatedMovie.director}`
      );

      updatedMovie.directorImage =
        await findPersonImage(
          updatedMovie.director
        );

      if (updatedMovie.directorImage) {
        console.log("   ✅ Director image found");
      } else {
        console.log(
          "   ⚠️ Director image still missing"
        );
      }
    }

    finalMovies.push(updatedMovie);

    // Small delay
    await new Promise((resolve) =>
      setTimeout(resolve, 200)
    );
  }

  fs.writeFileSync(
    outputFile,
    JSON.stringify(finalMovies, null, 2),
    "utf8"
  );

  console.log("\n==============================");
  console.log("🎉 IMAGE REPAIR COMPLETE");
  console.log("==============================");
  console.log(`Movies processed: ${finalMovies.length}`);
  console.log(`Saved to: ${outputFile}`);
}

main().catch((error) => {
  console.error("\n❌ Script failed:");
  console.error(error.message);
  process.exit(1);
});