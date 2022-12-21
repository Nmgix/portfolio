import path, { join } from "path";
import fs from "fs";
import matter from "gray-matter";

const doscDirectory = join(process.cwd(), "articles");

export function getDocBySlug(slug: string, locale: string) {
  try {
    const realSlug = slug.replace("/article/", "");
    const fullPath = join(doscDirectory, locale, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { slug: realSlug, meta: data, content };
  } catch (error) {
    return undefined;
  }
}

function fileList(dir: string) {
  return fs.readdirSync(dir).reduce((acc, curr) => {
    return acc.concat(curr.replace(".md", ""));
  }, [] as string[]);
}

export function getAllDocs(locale: string) {
  return fileList(path.join(doscDirectory, locale));
}
