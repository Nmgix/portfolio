import type { GetStaticProps, NextPage } from "next";
import { Alert } from "nmgix-components/src";
import React, { useEffect } from "react";
import { getAllDocs, getDocBySlug } from "helpers/getDocBySlug";
import {
  ArticleCellData,
  BioCellData,
  CoursesCellData,
  GitCellData,
  NewsletterDataTypes,
} from "components/CellsComponentsGroup/types";
import { CellGroup } from "components/CellsComponentsGroup";
import { FormattedMessage } from "react-intl";

const Home: NextPage<{ articles: NewsletterDataTypes[] }> = ({ articles }) => {
  return !articles || articles.length === 0 ? (
    <FormattedMessage id='aticles.loading.error' />
  ) : (
    <CellGroup data={articles} />
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  const articles = getAllDocs(locale!);
  const articlesData = articles.map((articleName) => {
    const { meta, content } = getDocBySlug(articleName, locale!)!;
    return {
      name: articleName,
      meta: meta,
      content: content,
    };
  }) as { name: string; meta: NewsletterDataTypes; content: string }[];
  const articleData: NewsletterDataTypes[] = articlesData.map((article) => {
    const { name, meta, content } = article;

    if (meta.type === "article") {
      return Object.assign({}, meta, {
        image: meta.linkedImages[0],
        url: "/article/" + name,
        sizes: [
          { width: 2, height: 1 },
          { width: 2, height: 2 },
        ],
      } as Partial<ArticleCellData>);
    } else if (meta.type === "courses") {
      return Object.assign({}, meta, {
        sizes: [{ width: 1, height: 2 }],
      } as Partial<CoursesCellData>);
    } else if (meta.type === "git") {
      return Object.assign({}, meta, {
        gitData: {
          issuesPersentage: 0,
          commitsPerYear: 408,
          codeReviewPersentage: 0,
          pullRequestsPersentage: 4,
        },
        sizes: [{ width: 2, height: 1 }],
      } as Partial<GitCellData>);
    } else if (meta.type === "bio") {
      return Object.assign({}, meta, {
        sizes: [{ width: 2, height: 3 }],
        description: content,
      } as Partial<BioCellData>);
    } else {
      return meta;
    }
  });

  return {
    props: {
      articles: articleData,
    },
    revalidate: 3600,
  };
};

export default Home;
