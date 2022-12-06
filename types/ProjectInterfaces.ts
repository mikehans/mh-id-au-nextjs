export interface ProjectFrontmatter {
    title: string;
    slug: string;
    date: string;
    description?: string;
    author?: string;
    type?: string;
    publish: boolean;
}

export interface ProjectProps {
    content: string;
    frontmatter: ProjectFrontmatter;
  }