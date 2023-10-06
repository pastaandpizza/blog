export async function fetchRecipesFiles(recipesDownloadUrls: string[]) {
  const recipes: any = {};
  await Promise.all(
    recipesDownloadUrls.map(async (url) => {
      const slug = url.split("/").pop()?.split(".")[0];

      const response = await fetch(url);
      const recipe = await response.text();

      recipes[slug] = recipe;
      return;
    })
  );

  return recipes;
}
