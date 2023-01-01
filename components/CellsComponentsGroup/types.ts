export type Size = {
  width: number;
  height: number;
};

export interface DefaultData {
  id: number;
  type: string;
  title: string;
  sizes: Size[];
  locale: string;
}

// может быть будет генератор ссылок по типу информации, хз
export interface ArticleCellData extends DefaultData {
  type: "article";
  authorsFavorites: boolean;
  ttr: number; // to read, in minutes
  date: string;
  url: string;
  description?: string;
  subtitle?: string;
  image?: string;
  linkedImages: string[];
  techStack?: string[];
  usefulLinks?: { name: string; url: string }[];
  // залить фон цветом или градиентом
  backgroundColor?: string[];
  color?: string;
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

export interface BioCellData extends DefaultData {
  type: "bio";
  // пока что временно ReactNode, а не ReactNode[]
  description: string;
}

export type NewsletterDataTypes = ArticleCellData | CoursesCellData | BioCellData;
