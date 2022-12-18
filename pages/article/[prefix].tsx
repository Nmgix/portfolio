import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/article/_article.module.scss";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { QRCodeSVG } from "qrcode.react";

import { getAllDocs, getDocBySlug } from "helpers/getDocBySlug";
import Head from "next/head";
import { Button } from "nmgix-components/src";
import { useRouter } from "next/router";
import { ArticleMeta, ArticlePageData } from "types/Article";

const Article: React.FC<ArticlePageData> = ({ meta, content, host }) => {
  const router = useRouter();

  const goToMain = () => {
    router.push("/");
  };

  const [qrLink, setQRLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQRLink(host + router.asPath);
    }
  }, []);

  return (
    <>
      <Button border={false} onClick={goToMain} size='m'>
        Назад
      </Button>
      <div className={styles.article}>
        <Head>
          <title>{"NMGIX | " + meta.title}</title>
        </Head>
        <header>
          <h1>{meta.title}</h1>
          <div className={styles.articleStats}>
            {meta.authors_favorites ? (
              <span className={styles.favourite}>
                <Image
                  src={"/icons/star.svg"}
                  alt='star logo, means article is favourite'
                  width={13}
                  height={13}
                  draggable={false}
                />
                Избранное у автора
              </span>
            ) : (
              <></>
            )}
            <span>{meta.ttr} мин. на чтение</span>
            <span>{meta.date.replaceAll(".", "/")}</span>
          </div>
          {meta.tech_stack || meta.useful_links ? (
            <div className={styles.articleStatsSecondary}>
              <div className={styles.stat}>
                {meta.tech_stack ? (
                  <>
                    <span className={styles.statHeader}>Стек технологий</span>
                    <ul>
                      {meta.tech_stack.map((tech) => (
                        <li key={tech}>
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.stat}>
                {meta.useful_links ? (
                  <>
                    <span className={styles.statHeader}>Полезные ссылки</span>
                    <ul>
                      {meta.useful_links.map((link) => (
                        <li key={link.name}>
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
          <div className={styles.linkedImages}>
            {meta.linkedImages.slice(0, 4).map((image) => (
              <Image
                src={image}
                alt='linked image to article'
                fill
                sizes='(max-width: 768px) 400,
              500'
                priority={true}
                key={image}
                draggable={false}
              />
            ))}
            {meta.linkedImages.length > 4 ? (
              <span>
                <Button border={false} onClick={() => {}} size='m'>
                  +{meta.linkedImages.length - 4}
                </Button>
              </span>
            ) : (
              <></>
            )}
          </div>
          <main className={styles.main}>
            <Markdown>{content}</Markdown>
          </main>
        </section>
        {qrLink !== undefined ? (
          <div className={styles.qrCode}>
            <div>
              <h3>Вы дошли до конца статьи 🎉</h3>
              <p>Если вам понравилось прочитанное, вы можете поделиться статьёй в соцсетях или скинуть QR-код справа</p>
              <div>
                <h5>Поделиться</h5>
                <div className={styles.socials}>
                  <Button size='m' onClick={() => {}} border={false}>
                    <Image src={"/icons/social-vk.svg"} width={25} height={25} alt='vk logo' draggable={false} />
                  </Button>
                  <Button size='m' onClick={() => {}} border={false}>
                    <Image src={"/icons/social-fb.svg"} width={25} height={25} alt='facebook logo' draggable={false} />
                  </Button>
                  <Button size='m' onClick={() => {}} border={false}>
                    <Image src={"/icons/social-ig.svg"} width={25} height={25} alt='instagram logo' draggable={false} />
                  </Button>
                  <Button size='m' onClick={() => {}} border={false}>
                    <Image src={"/icons/social-tg.svg"} width={25} height={25} alt='telegram logo' draggable={false} />
                  </Button>
                </div>
              </div>
            </div>
            <QRCodeSVG value={qrLink} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Article;

// export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
//   const { prefix } = query;
//   let md = getDocBySlug(prefix as string);
//   if (!md) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: true,
//       },
//     };
//   } else {
//     const pageProps: ArticlePageData = {
//       meta: md.meta as ArticleMeta,
//       content: md.content,
//       host: req.headers.host!,
//     };

//     return {
//       props: pageProps,
//     };
//   }
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllDocs();
  return {
    paths: articles.map((articleName) => {
      return {
        params: {
          prefix: articleName,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { prefix } = params!;
  let md = getDocBySlug(prefix as string);
  if (!md) {
    return {
      notFound: true,
    };
  } else {
    const pageProps: ArticlePageData = {
      meta: md.meta as ArticleMeta,
      content: md.content,
      host: process.env["HOST"]!,
    };

    return {
      props: pageProps,
    };
  }
};
