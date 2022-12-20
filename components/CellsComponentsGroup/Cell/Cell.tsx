import React, { memo } from "react";
import { NewsletterDataTypes } from "../types";
import styles from "../_cell.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { Image } from "nmgix-components/src";

const NewsletterDataComponent: React.FC<NewsletterDataTypes> = (cell) => {
  const { width, height } = cell.sizes[0];

  switch (cell.type) {
    case "git": {
      return (
        <div className={styles.cellTypeGithub}>
          <a href={cell.url} target='_blank' referrerPolicy='no-referrer'>
            <h3>Github Stats</h3>
            <div>
              <span>
                <b>{cell.gitData.commitsPerYear}</b> коммитов в год
              </span>
              <span>
                <b>{cell.gitData.codeReviewPersentage}%</b> код-ревью в год
              </span>
            </div>
            {/* cell.gitData.commitsImg */}
            <Image src={cell.gitData.commitsImg} label={"github-stats"} showLabel={false} />
            <div>
              <span>
                <b>{cell.gitData.issuesPersentage}%</b> тикетов
              </span>
              <span>
                <b>{cell.gitData.pullRequestsPersentage}%</b> пулл-реквесты
              </span>
            </div>
          </a>
        </div>
      );
    }
    case "bio": {
      return <div className={clsx(styles.cellTypeBio)}>{cell.description}</div>;
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
            // className='cell-type-article cell-type-article-2x1'
            className={clsx(styles.cellTypeArticle, styles.cellTypeArticle2x1)}
            style={{
              background: cell.backgroundColor
                ? cell.backgroundColor.length > 1
                  ? `linear-gradient(180deg, ${cell.backgroundColor.join(",")})`
                  : cell.backgroundColor[0]
                : "",
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
                <Link href={cell.url} referrerPolicy='same-origin'>
                  {cell.title}
                </Link>
              </h3>
              <div className={clsx(styles.articleTime)}>
                <span>{cell.ttr} мин на чтение</span>
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
                  ? `linear-gradient(180deg, ${cell.backgroundColor.join(",")})`
                  : cell.backgroundColor[0]
                : "",
            }}>
            <div className={clsx(styles.imageWrapper)}>
              {cell.image ? (
                <img src={cell.image} draggable={false} />
              ) : (
                <div className={clsx(styles.imagePlaceholder)}></div>
              )}
            </div>
            <h3>
              <a href={cell.url} referrerPolicy='same-origin'>
                {cell.title}
              </a>
            </h3>
            <div className={clsx(styles.cellTypeArticleMain)}>
              <div className={clsx(styles.articleTime)}>
                <span>{cell.ttr} мин на чтение</span>
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
                        background: `linear-gradient(180deg, #00000000, ${
                          cell.backgroundColor
                            ? cell.backgroundColor[cell.backgroundColor.length - 1]
                            : "rgba(var(--color-background-alter), 1)"
                        })`,
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
 * @param data data t render, includes basic information (id, size) and type-specific (description, images, e.t.c.).
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
  () => true
);
