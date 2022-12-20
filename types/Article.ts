import { ArticleCellData, NewsletterDataTypes } from "components/CellsComponentsGroup/types";

export type ArticleData = {
  meta: ArticleCellData;
  content: string;
};

export type ArticlePageData = ArticleData & { host: string };
