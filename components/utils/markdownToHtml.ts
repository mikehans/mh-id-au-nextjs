import { marked } from "marked";
// import { remark } from "remark";
// import remarkRehype from "remark-rehype";
// import rehypeStringify from "rehype-stringify";


export function markdownToHtml(markdownContent: string): string {
//   let result;
  //   result = await remark()
  //     .use(remarkRehype)
  //     .use(rehypeStringify)
  //     .process(markdownContent);

  return marked(markdownContent);
}
