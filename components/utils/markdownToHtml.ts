import { marked } from "marked";

export function markdownToHtml(markdownContent: string): string {
  return marked(markdownContent);
}
