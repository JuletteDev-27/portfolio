

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { siGithub } from "simple-icons"; import type { Project } from "@/types/project";

type ProjectCardProps = {
    project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
    const technologies =
        project.projectDetails?.technologies
            ?.split(",")
            .map((technology) => technology.trim())
            .filter(Boolean) ?? [];

    const details = project.projectDetails;
    const status = details?.status;
    const liveUrl = details?.liveUrl;
    const githubUrl = details?.githubUrl;

    return (
        <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_16px_50px_-24px_#A78BFA30]">
            <Link
                href={`/projects/${project.slug}`}
                className="group/image relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
                aria-label={`View ${project.title} project`}
            >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-hover">
                    {project.featuredImage?.node ? (
                        <img
                            src={project.featuredImage.node.sourceUrl}
                            alt={
                                project.featuredImage.node.altText ||
                                project.title
                            }
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6D5A8730] via-surface to-background">
                            <span className="px-6 text-center text-2xl font-semibold tracking-tight text-foreground/70">
                                {project.title}
                            </span>
                        </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-70" />

                    <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-background/80 text-foreground opacity-0 backdrop-blur-md transition duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100 group-focus-within/image:translate-y-0 group-focus-within/image:opacity-100">
                        <ArrowUpRight size={18} />
                    </span>
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 break-words text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-xl">
                        <Link
                            href={`/projects/${project.slug}`}
                            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                            {project.title}
                        </Link>
                    </h3>

                    {status && (
                        <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {status}
                        </span>
                    )}
                </div>

                {details?.description && (
                    <p className="mt-3 line-clamp-3 break-words text-sm leading-7 text-muted">
                        {details.description}
                    </p>
                )}

                {technologies.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-muted transition-colors group-hover:border-border-hover"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5 mt-6">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
                    >
                        View case study
                        <ArrowUpRight size={15} />
                    </Link>

                    <div className="flex items-center gap-3">
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} on GitHub`}
                                title="View source code"
                                className="rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                            >
                                <svg
                                    role="img"
                                    aria-label="GitHub"
                                    viewBox="0 0 24 24"
                                    className="h-[17px] w-[17px] fill-current"
                                >
                                    <path d={siGithub.path} />
                                </svg>                            </a>
                        )}

                        {liveUrl && (
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open live demo of ${project.title}`}
                                title="Open live demo"
                                className="rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                            >
                                <ExternalLink size={17} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
