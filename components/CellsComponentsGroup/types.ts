export type Size = {
  width: number;
  height: number;
};

export interface DefaultData {
  type: string;
  id: number;
  title: string;
  sizes: Size[];
  image?: string;
  description?: string | string[] | React.ReactNode | React.ReactNode[];
}

// может быть будет генератор ссылок по типу информации, хз
export interface ArticleCellData extends DefaultData {
  type: "article";
  time: number; // to read, in minutes
  date: string;
  url: string;
  techStack: string[];
  // залить фон цветом или градиентом
  backgroundColor?: string[];
}

export interface CoursesCellData extends DefaultData {
  type: "courses";

  //   пока что неиспользуемая переменная, будет отвечать за окраску окантовки курсов и общего блока -> будет необходимо
  // немного переделать метод рендера чтобы родитель окрашивался (вряд ли полностью переделывать рендер, скорее какой-то аля switch case)
  borderColor: string;
  courses: {
    title: string;
    teacher: string;
    mark: {
      stars: number;
      starsMax: number;
    };
    completePersantage: number;
    link: string;
  }[];
}

export interface GitCellData extends DefaultData {
  type: "git";
  borderColor: string;
  url: string;
  gitData: {
    commitsPerYear: number;
    commitsImg: string;
    commitPersentage?: number;
    pullRequestsPersentage?: number;
    codeReviewPersentage?: number;
    issuesPersentage?: number;
  };
}

export interface BioCellData extends DefaultData {
  type: "bio";
  // пока что временно ReactNode, а не ReactNode[]
  description: React.ReactNode;
}

export type NewsletterDataTypes = ArticleCellData | CoursesCellData | BioCellData | GitCellData;
