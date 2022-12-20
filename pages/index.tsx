import type { GetStaticProps, NextPage } from "next";
import { Alert } from "nmgix-components/src";
import React from "react";
import { getAllDocs, getDocBySlug } from "helpers/getDocBySlug";
import { ArticleCellData, DefaultData, NewsletterDataTypes } from "components/CellsComponentsGroup/types";
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
  }) as { name: string; data: NewsletterDataTypes }[];
  // const articleData: ArticleCellData[] = metas.filter(meta => meta.data.type === 'article').map((meta) => {
  //   const { name, data } = meta;

  //     return {
  //       id: data.id,
  //       sizes: [
  //         { height: 2, width: 2 },
  //         { height: 1, width: 2 },
  //       ],
  //       title: data.title,
  //       type: "article",
  //       date: data.date,
  //       time: data.ttr,
  //       url: "/article/" + name,
  //       authors_favorites: data,
  //       techStack: data.techStack ?? [],
  //       image: data.linkedImages[0],
  //       description: data.description ?? "",
  //     };

  // });
  const articleData: NewsletterDataTypes[] = metas.map((meta) => {
    const { name, data } = meta;

    if (data.type === "article") {
      return Object.assign({}, data, {
        image: data.linkedImages[0],
        url: "/article/" + name,
        sizes: [
          { width: 2, height: 1 },
          { width: 2, height: 2 },
        ],
      } as Partial<ArticleCellData>);
    } else if (data.type === "courses") {
      return Object.assign({}, data, {
        sizes: [{ width: 1, height: 2 }],
      } as Partial<DefaultData>);
    } else if (data.type === "git") {
      return Object.assign({}, data, {
        sizes: [{ width: 2, height: 1 }],
      } as Partial<DefaultData>);
    } else if (data.type === "bio") {
      return Object.assign({}, data, {
        sizes: [{ width: 2, height: 3 }],
      } as Partial<DefaultData>);
    } else {
      return data;
    }
  });

  return {
    props: {
      articles: articleData,
    },
  };
};

export default Home;
