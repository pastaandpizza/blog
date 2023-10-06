import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Layout from "../components/layout";
import { getAllRecipes } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";

type Props = {
  allRecipes: Post[];
};

export default function Index({ allRecipes }: Props) {
  const heroPost = allRecipes[0];
  const moreRecipes = allRecipes.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>{`Pasta and Pizza`}</title>
        </Head>
        <Container>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {moreRecipes.length > 0 && <MoreStories recipes={moreRecipes} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allRecipes = getAllRecipes([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allRecipes },
  };
};
