import { fetchRecipesFiles } from "./fetchRecipesFiles";

export async function fetchRecipes() {
  const recipesUrl = process.env.RECIPES_URL;
  const response = await fetch(
    recipesUrl
    // uncomment and add your github token to .env to avoid rate limiting
    //   , {
    //   headers: {
    //     Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    //   },
    // }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch Markdown file: " + recipesUrl);
  }
  const contents = JSON.parse(await response.text()).filter(
    (content) => content.name.endsWith(".md") && content.name.startsWith("pl-")
  );

  const recipesDownloadUrls = contents.map((content) => content.download_url);

  const recipes = await fetchRecipesFiles(recipesDownloadUrls);

  return recipes;
}
