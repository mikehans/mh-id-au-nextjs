import matter, { GrayMatterFile } from "gray-matter";

export type GrayMatterPartial = Pick<
  GrayMatterFile<string>,
  "data" | "content"
>;

export function parseFrontMatter(
  markdownWithMetadata: string
): GrayMatterPartial {
  const { data, content } = matter(markdownWithMetadata);
  return { data, content };
}
