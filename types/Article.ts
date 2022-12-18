export type ArticleMeta = {
  title: string;
  authors_favorites: boolean;
  ttr: number;
  date: string;
  linkedImages: string[];
  tech_stack?: string[];
  useful_links?: { name: string; url: string }[];
};

export type ArticleData = {
  meta: ArticleMeta;
  content: string;
};

export type ArticlePageData = ArticleData & { host: string };
