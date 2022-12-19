import type { GetStaticProps, NextPage } from "next";
import { Alert } from "nmgix-components/src";
import React from "react";
import { getAllDocs, getDocBySlug } from "helpers/getDocBySlug";
import { ArticleMeta } from "types/Article";
import { ArticleCellData, NewsletterDataTypes } from "components/CellsComponentsGroup/types";
import { CellGroup } from "components/CellsComponentsGroup";

const Home: NextPage<{ articles: NewsletterDataTypes[] }> = ({ articles }) => {
  return <CellGroup data={articles} />;
};

export const getStaticProps: GetStaticProps = () => {
  const articles = getAllDocs();
  const metas = articles.map((articleName) => {
    const { meta } = getDocBySlug(articleName)!;
    return {
      name: articleName,
      data: meta,
    };
  }) as { name: string; data: ArticleMeta }[];
  const articleData: ArticleCellData[] = metas.map((meta) => {
    const { name, data } = meta;

    return {
      date: data.date,
      id: data.id,
      sizes: [
        { height: 2, width: 2 },
        { height: 1, width: 2 },
      ],
      time: data.ttr,
      title: data.title,
      type: "article",
      url: "/article/" + name,
      techStack: data.tech_stack ?? [],
      image: meta.data.linkedImages[0],
      description: data.description ?? "",
    };
  });

  return {
    props: {
      articles: articleData,
    },
  };
};

export default Home;
