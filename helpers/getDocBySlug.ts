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
    return undefined;
  }
}
