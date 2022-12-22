import React, { memo } from "react";
import { NewsletterDataTypes } from "../types";
import styles from "../_cell.module.scss";
import clsx from "clsx";
import Link from "next/link";
import Markdown from "markdown-to-jsx";

import dynamic from "next/dynamic";
import { randomIntFromInterval } from "helpers/randomNumber";
import { FormattedMessage } from "react-intl";
const ReactGitHubCalendar = dynamic(() => import("react-ts-github-calendar"), {
  ssr: false,
});

const NewsletterDataComponent: React.FC<NewsletterDataTypes> = (cell) => {
  const { width, height } = cell.sizes[0];
  console.log(cell);

  switch (cell.type) {
    case "git": {
      return (
        <div className={styles.cellTypeGithub}>
          <a href={cell.url} target='_blank' referrerPolicy='no-referrer'>
            <h3>Github Stats</h3>
            <div>
              <span>
                <b>{cell.gitData.commitsPerYear}</b> <FormattedMessage id='article.github.commits' />
              </span>
              <span>
                <b>{cell.gitData.codeReviewPersentage}%</b> <FormattedMessage id='article.github.codereviews' />
              </span>
            </div>
            <ReactGitHubCalendar userName={cell.nick} responsive global_stats={false} tooltips={false} />
            <div>
              <span>
                <b>{cell.gitData.issuesPersentage}%</b> <FormattedMessage id='article.github.tickets' />
              </span>
              <span>
                <b>{cell.gitData.pullRequestsPersentage}%</b> <FormattedMessage id='article.github.pullrequests' />
              </span>
            </div>
          </a>
        </div>
      );
    }
    case "bio": {
      return (
        <div className={clsx(styles.cellTypeBio)}>
          <h3>{cell.title}</h3>
          <Markdown>{cell.description}</Markdown>
        </div>
      );
    }
    case "courses": {
      return (
        <div className={clsx(styles.cellTypeCourses)}>
          <h3 dangerouslySetInnerHTML={{ __html: cell.title }} />
          <ul
            className={clsx(styles.cellTypeCoursesContent)}
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            {cell.courses.map((course) => (
              <li key={course.title} style={{ border: `4px solid ${cell.borderColor}` }}>
                <a href={course.link} referrerPolicy='no-referrer' target={"_blank"}>
                  <div className={clsx(styles.courseMain)}>
                    <p>{course.title}</p>
                    <p>{course.teacher}</p>
                  </div>
                  <div className={clsx(styles.courseStats)}>
                    <span>
                      <b>
                        {course.mark.stars}/{course.mark.starsMax}
                      </b>
                    </span>
                    <span>
                      <b>{course.completePersantage}%</b>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    case "article": {
      if (width === 2 && height === 1) {
        return (
          <div
            className={clsx(styles.cellTypeArticle, styles.cellTypeArticle2x1)}
            style={{
              background: cell.backgroundColor
                ? cell.backgroundColor.length > 1
                  ? `linear-gradient(${randomIntFromInterval(0, 360)}deg, ${cell.backgroundColor.join(",")})`
                  : cell.backgroundColor[0]
                : undefined,
            }}>
            <div className={clsx(styles.imageWrapper)}>
              {cell.image ? (
                <img src={cell.image} draggable={false} />
              ) : (
                <div className={clsx(styles.imagePlaceholder)}></div>
              )}
            </div>
            <div className={clsx(styles.cellTypeArticleMain)}>
              <h3>
                <Link href={cell.url} locale={cell.locale} referrerPolicy='same-origin'>
                  {cell.title}
                </Link>
              </h3>
              <div className={clsx(styles.articleTime)}>
                <span>
                  {cell.ttr} <FormattedMessage id='article.subtitle.ttr' />
                </span>
                <span>{cell.date}</span>
              </div>
              {cell.techStack ? (
                <ul className={clsx(styles.articleTechstack)}>
                  {cell.techStack.map((technology) => (
                    <li key={technology}>
                      <b>{technology}</b>
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div
            // className='cell-type-article cell-type-article-2x2'
            className={clsx(styles.cellTypeArticle, styles.cellTypeArticle2x2)}
            style={{
              background: cell.backgroundColor
                ? cell.backgroundColor.length > 1
                  ? `linear-gradient(${randomIntFromInterval(0, 360)}deg, ${cell.backgroundColor.join(",")})`
                  : cell.backgroundColor[0]
                : undefined,
            }}>
            <div className={clsx(styles.imageWrapper)}>
              {cell.image ? (
                <img src={cell.image} draggable={false} />
              ) : (
                <div className={clsx(styles.imagePlaceholder)}></div>
              )}
            </div>
            <h3>
              <Link href={cell.url} locale={cell.locale} referrerPolicy='same-origin'>
                {cell.title}
              </Link>
            </h3>
            <div className={clsx(styles.cellTypeArticleMain)}>
              <div className={clsx(styles.articleTime)}>
                <span>
                  {cell.ttr} <FormattedMessage id='article.subtitle.ttr' />
                </span>
                <span>{cell.date}</span>
              </div>
              {cell.techStack ? (
                <ul className={clsx(styles.articleTechstack)}>
                  {cell.techStack.map((technology) => (
                    <li key={technology}>
                      <b>{technology}</b>
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
              {cell.description ? (
                <div style={{ position: "relative" }}>
                  <p
                    className={clsx(styles.articleDescription)}
                    dangerouslySetInnerHTML={{
                      __html: `${cell.description.toString().slice(0, 90)}${
                        cell.description.toString().length > 90 ? "..." : ""
                      }`,
                    }}
                  />
                  {cell.description.toString().length > 90 ? (
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "50%",
                        background: cell.backgroundColor
                          ? undefined
                          : `linear-gradient(180deg, #00000000, rgba(var(--color-background-alter), 1))`,
                        bottom: 0,
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      }
    }
  }
};

/**
 * Cell Component.
 * Component used to render data, basing on data type and size of a cell.
 * @param data data to render, includes basic information (id, size) and type-specific (description, images, e.t.c.).
 * @returns {React.FC<NewsletterDataTypes>} Functional Component
 */
export const Cell: React.FC<NewsletterDataTypes> = memo(
  (cellData) => {
    const { id } = cellData;

    return (
      <li
        className={clsx(styles.cell)}
        style={{
          gridArea: `cell-${id}`,
          border: cellData.type === "courses" || cellData.type === "git" ? `3px solid ${cellData.borderColor}` : "",
        }}
        key={id}>
        <NewsletterDataComponent {...cellData} />
      </li>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.locale === nextProps.locale;
  }
);
