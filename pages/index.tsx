import type { GetStaticProps, NextPage } from "next";
import { Alert, CellGroup } from "nmgix-components/src";
import React from "react";
import { getAllDocs, getDocBySlug } from "helpers/getDocBySlug";
import { NewsletterDataTypes } from "nmgix-components/src/components/CellsComponentsGroup/types";
import { ArticleMeta } from "types/Article";
import { ArticleCellData } from "nmgix-components/src/components/CellsComponentsGroup/types";

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
      id: -1,
      sizes: [
        { height: 2, width: 2 },
        { height: 1, width: 2 },
      ],
      time: data.ttr,
      title: data.title,
      type: "article",
      url: "/article/" + name,
      techStack: data.tech_stack ?? [],
    };
  });

  return {
    props: {
      articles: articleData,
    },
  };
};

export default Home;
