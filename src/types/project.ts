export type ProjectImage = {
    sourceUrl: string;
    altText: string | null;
};

export type ProjectDetails = {
    description: string;
    githubUrl: string | null;
    liveUrl: string | null;
    status: string;
    projectType: string;
    technologies: string;
};

export type Project = {
    id: string;
    title: string;
    slug: string;
    date: string;

    featuredImage: {
        node: ProjectImage | null;
    } | null;

    projectDetails: ProjectDetails;
};
