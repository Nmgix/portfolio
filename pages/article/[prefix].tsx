import { GetServerSideProps } from "next";
import React from "react";
import styles from "../../styles/pages/article/_article.module.scss";
import Image from "next/image";
// import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";

import { getDocBySlug } from "helpers/getDocBySlug";

type ArticleMeta = {
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

const Article: React.FC<ArticleData> = ({ meta, content }) => {
  return (
    <div className={styles.article}>
      <header>
        <h2>{meta.title}</h2>
        <div>
          <span>{meta.authors_favorites ? <span>STAR избранное у автора</span> : <></>}</span>
          <span>{meta.ttr} мин. на чтение</span>
          <span>{meta.date.replace(".", "/")}</span>
        </div>
        {meta.tech_stack || meta.useful_links ? (
          <div>
            <div>
              {meta.tech_stack ? (
                <>
                  <span>Стек технологий</span>
                  <ul>
                    {meta.tech_stack.map((tech) => (
                      <li>{tech}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              {meta.useful_links ? (
                <>
                  <span>Полезные ссылки</span>
                  <ul>
                    {meta.useful_links.map((link) => (
                      <li>
                        <a href={link.url}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </header>
      <section>
        <div>
          {meta.linkedImages.map((image) => (
            <Image src={image} alt='linked image to article' width={200} height={100} key={image} />
          ))}
        </div>
        <main>
          {/* <ReactMarkdown children={content} /> */}
          <Markdown>{content}</Markdown>
        </main>
      </section>
    </div>
  );
};

export default Article;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { prefix } = query;
  let md = getDocBySlug(prefix as string);
  if (!md) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  } else {
    return {
      props: md,
    };
  }
};
