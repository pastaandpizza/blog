import matter from "gray-matter";

export function getPostBySlug(
  slug: string,
  fields: string[] = [],
  postContent: any
) {
  const { data, content } = matter(postContent);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllRecipes(fields: string[] = [], recipes: any) {
  return (
    Object.keys(recipes)
      .map((slug) => getPostBySlug(slug, fields, recipes[slug]))
      // sort recipes by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  );
}
