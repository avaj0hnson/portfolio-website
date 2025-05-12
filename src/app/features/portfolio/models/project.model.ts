export type ProjectCategory = 'apps' | 'me' | 'websites';

export interface ProjectLink {
    label: string;
    url: string;
}

export interface Project {
    title: string;
    description: string;
    image: string;
    category: ProjectCategory[];
    tags?: string[];
    links: ProjectLink[];
    inProgress?: boolean;
}
