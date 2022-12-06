export interface BlogFrontmatter {
    title: string;
    slug: string;
    date: string;
    author?: string;
    type?: string;
    tags?: Array<string>;
  }