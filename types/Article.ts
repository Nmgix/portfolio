import { NewsletterDataTypes } from "components/CellsComponentsGroup/types";

export type ArticleData = {
  meta: NewsletterDataTypes;
  content: string;
};

export type ArticlePageData = ArticleData & { host: string };
