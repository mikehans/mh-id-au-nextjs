import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export async function markdownToHtml(markdownContent: string): Promise<VFile> {
    let result;
    result = await remark().use(remarkRehype).use(rehypeStringify).process(markdownContent);
	return result;
}
