import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

const doscDirectory = join(process.cwd(), "articles");

export function getDocBySlug(slug: string) {
  try {
    const realSlug = slug.replace("/article/", "");
    const fullPath = join(doscDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { slug: realSlug, meta: data, content };
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

function fileList(dir: string) {
  return fs.readdirSync(dir).reduce((acc, curr) => {
    return acc.concat(curr.replace(".md", ""));
  }, [] as string[]);
}

export function getAllDocs() {
  return fileList(doscDirectory);
}
