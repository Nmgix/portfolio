import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/article/_article.module.scss";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { QRCodeSVG } from "qrcode.react";

import { getAllDocs, getDocBySlug } from "helpers/getDocBySlug";
import Head from "next/head";
import { Button, TransitionStyles } from "nmgix-components/src";
import { useRouter } from "next/router";
import { ArticlePageData } from "types/Article";
import { Icon } from "components/Icon/Icon";
import { ArticleCellData } from "components/CellsComponentsGroup/types";
import { randomIntFromInterval } from "helpers/randomNumber";
import { FormattedMessage } from "react-intl";
import { Transition, TransitionGroup } from "react-transition-group";
import { slideTransitionFunction } from "types/Transitions";

const Article: NextPage<ArticlePageData> = ({ meta, content, host }) => {
  const router = useRouter();
  const goToMain = () => {
    return router.push("/", undefined, { shallow: true });
  };

  const [qrLink, setQRLink] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setQRLink(host + router.asPath);
    }
  }, []);

  const [rendered, setRendered] = useState<boolean>(false);
  useEffect(() => {
    setRendered(true);
  }, []);
  const slideTransition = slideTransitionFunction(30);

  const BackButton: React.FC = () => (
    <Transition in={rendered} timeout={1000}>
      {(state) => (
        <div style={{ ...slideTransition[state as keyof TransitionStyles] }}>
          <Button buttonBorder={false} onClick={goToMain} size='m' classNames={[styles.returnButton]}>
            <Icon icon='arrow-left' width={18} height={15} />
            <span>
              <FormattedMessage id='controls.back' />
            </span>
          </Button>
        </div>
      )}
    </Transition>
  );

  const MetaTechstack: React.FC = () =>
    meta.techStack ? (
      <>
        <span className={styles.statHeader}>
          <FormattedMessage id='article.description.techstack' />
        </span>
        <ul>
          {meta.techStack.map((tech) => (
            <li key={tech}>
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <></>
    );

  const MetaLinks: React.FC = () =>
    meta.useful_links ? (
      <>
        <span className={styles.statHeader}>
          <FormattedMessage id='article.description.links' />
        </span>
        <ul>
          {meta.useful_links.map((link) => (
            <li key={link.name}>
              <a href={link.url} target={"_blank"} rel={"no-referrer"}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <></>
    );

  const MetaSubcontent: React.FC = () =>
    meta.techStack || meta.useful_links ? (
      <div className={styles.articleStatsSecondary}>
        <div className={styles.stat}>
          <MetaTechstack />
        </div>
        <div className={styles.stat}>
          <MetaLinks />
        </div>
      </div>
    ) : (
      <></>
    );

  const MetaAuthorsFavourite: React.FC = () =>
    meta.authors_favorites ? (
      <span className={styles.favourite}>
        <Icon icon='star' width={13} height={13} />
        <FormattedMessage id='article.subtitle.favourite' />
      </span>
    ) : (
      <></>
    );

  const ArticleHeader: React.FC = () => (
    <Transition in={rendered} timeout={100}>
      {(state) => (
        <header
          style={{
            ...slideTransition[state as keyof TransitionStyles],
          }}>
          <div
            className={styles.title}
            style={{
              background: meta.backgroundColor
                ? meta.backgroundColor.length > 1
                  ? `linear-gradient(${randomIntFromInterval(0, 360)}deg, ${meta.backgroundColor.join(", ")})`
                  : meta.backgroundColor[0]
                : undefined,
              marginBottom: meta.backgroundColor ? "10px" : undefined,
              color: meta.color ?? "rgba(var(--color-background-alter), 1)",
            }}>
            <h1>{meta.title}</h1>
            {meta.subtitle ? <span>{meta.subtitle}</span> : <></>}
          </div>
          <div className={styles.articleStats}>
            <MetaAuthorsFavourite />
            <span>
              {meta.ttr} <FormattedMessage id='article.subtitle.ttr' />
            </span>
            <span>{meta.date ? meta.date.replaceAll(".", "/") : <></>}</span>
          </div>
          <MetaSubcontent />
        </header>
      )}
    </Transition>
  );

  const ImageSection: React.FC = () =>
    meta.linkedImages ? (
      <Transition in={rendered} timeout={250}>
        {(state) => (
          <div
            className={styles.linkedImages}
            style={{
              ...slideTransition[state as keyof TransitionStyles],
            }}>
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
                <Button buttonBorder={false} onClick={() => {}} size='m'>
                  +{meta.linkedImages.length - 4}
                </Button>
              </span>
            ) : (
              <></>
            )}
          </div>
        )}
      </Transition>
    ) : (
      <></>
    );

  const ContentSection: React.FC = () => (
    <section>
      <ImageSection />
      <Transition in={rendered} timeout={350}>
        {(state) => (
          <main
            className={styles.main}
            style={{
              ...slideTransition[state as keyof TransitionStyles],
            }}>
            <Markdown>{content}</Markdown>
          </main>
        )}
      </Transition>
    </section>
  );

  const SocialSection: React.FC = () => (
    <div className={styles.socials}>
      <Button size='m' onClick={() => {}} buttonBorder={false}>
        <Image src={"/icons/social-vk.svg"} width={25} height={25} alt='vk logo' draggable={false} />
      </Button>
      <Button size='m' onClick={() => {}} buttonBorder={false}>
        <Image src={"/icons/social-fb.svg"} width={25} height={25} alt='facebook logo' draggable={false} />
      </Button>
      <Button size='m' onClick={() => {}} buttonBorder={false}>
        <Image src={"/icons/social-ig.svg"} width={25} height={25} alt='instagram logo' draggable={false} />
      </Button>
      <Button size='m' onClick={() => {}} buttonBorder={false}>
        <Image src={"/icons/social-tg.svg"} width={25} height={25} alt='telegram logo' draggable={false} />
      </Button>
    </div>
  );

  const QRLinkSection: React.FC = () =>
    qrLink === undefined ? (
      <></>
    ) : (
      <Transition in={rendered} timeout={250}>
        {(state) => (
          <div
            className={styles.qrCode}
            style={{
              ...slideTransition[state as keyof TransitionStyles],
            }}>
            <div>
              <h3>
                <FormattedMessage id='article.footer.title' />
              </h3>
              <p>
                <FormattedMessage id='article.footer.calltoaction' />
              </p>
              <div>
                <h5>
                  <FormattedMessage id='article.footer.share' />
                </h5>
                <SocialSection />
              </div>
            </div>
            <QRCodeSVG value={qrLink} />
          </div>
        )}
      </Transition>
    );

  return (
    <>
      <TransitionGroup component={null}>
        <BackButton />
        <div className={styles.article}>
          <Head>
            <title>{"NMGIX | " + meta.title}</title>
          </Head>
          <ArticleHeader />
          <ContentSection />
          <QRLinkSection />
        </div>
      </TransitionGroup>
    </>
  );
};

export default Article;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const articles = locales!
    .map((locale) => {
      const files = getAllDocs(locale);
      return files.map((fileName) => {
        return { fileName, locale };
      });
    })
    .flat();
  return {
    paths: articles.map((file) => {
      return {
        params: {
          prefix: file.fileName,
        },
        locale: file.locale,
      };
    }),
    // fallback: true,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params, locale }) => {
  const { prefix } = params!;

  let md = getDocBySlug(prefix as string, locale!);
  if (!md) {
    return {
      notFound: true,
    };
  } else {
    const pageProps: ArticlePageData = {
      meta: md.meta as ArticleCellData,
      content: md.content,
      host: process.env["HOST"]!,
    };

    return {
      props: pageProps,
    };
  }
};
