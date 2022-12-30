import type { GetStaticProps, NextPage } from "next";

import { getAllDocs, getDocBySlug } from "helpers/getDocBySlug";
import {
  ArticleCellData,
  BioCellData,
  CoursesCellData,
  NewsletterDataTypes,
} from "components/CellsComponentsGroup/types";
import { CellGroup } from "components/CellsComponentsGroup/CellGroup/CellGroup";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import useWindowDimentions from "nmgix-components/src/hooks/useWindowDimentions";

const Home: NextPage<{ articles: NewsletterDataTypes[] }> = ({ articles }) => {
  const router = useRouter();
  const { width } = useWindowDimentions();

  return !articles || articles.length === 0 ? (
    <FormattedMessage id='article.loading.error' />
  ) : (
    <CellGroup data={articles} locale={router.locale!} width={width} />
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

    switch (meta.type) {
      case "article": {
        const sizes = [
          { width: 2, height: 1 },
          { width: 2, height: 2 },
        ];

        return Object.assign({}, meta, {
          image: meta.linkedImages[0],
          url: "/article/" + name,
          sizes,
        } as Partial<ArticleCellData>);
      }
      case "bio": {
        const sizes = [{ width: 2, height: 3 }];

        return Object.assign({}, meta, {
          sizes,
          description: content,
        } as Partial<BioCellData>);
      }
      case "courses": {
        const sizes = [
          { width: 1, height: 2 },
          { width: 2, height: 2 },
        ];

        return Object.assign({}, meta, {
          sizes,
        } as Partial<CoursesCellData>);
      }
      default: {
        return meta;
      }
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
