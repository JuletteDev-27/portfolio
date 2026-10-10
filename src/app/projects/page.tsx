
export const instant = false;

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, FolderCode } from "lucide-react";
import { wordpress } from "@/lib/wordpress";
import { GET_PROJECTS } from "@/lib/queries";
import type { Project } from "@/types/project";
import type { Metadata } from "next";

type GetProjectsResponse = {
    projects: {
        nodes: Project[];
    };
};

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore my software development projects, technical work, and applications I've built.",
    openGraph: {
        title: "Projects",
        description:
            "Explore my software development projects and applications.",
        type: "website",
    },
};

export default async function ProjectsPage() {
    const data =
        await wordpress.request<GetProjectsResponse>(GET_PROJECTS);

    const projects = data.projects.nodes;

    return (
        <main className="min-h-screen">
            {/* Page introduction */}
            <section className="relative overflow-hidden border-b border-border">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#A78BFA]/10 blur-[110px]"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                        <FolderCode size={15} />
                        Selected work
                    </p>

                    <div className="mt-5 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                                Projects &amp; experiments.
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                                A collection of applications, software
                                projects, and technical work built through
                                hands-on engineering and exploration.
                            </p>
                        </div>

                        <a
                            href="#project-list"
                            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:border-border-hover hover:text-accent"
                        >
                            Explore projects
                            <ArrowDownRight size={16} />
                        </a>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted">
                        <span className="rounded-full border border-border bg-surface/70 px-3 py-1.5">
                            {projects.length}{" "}
                            {projects.length === 1 ? "project" : "projects"}
                        </span>
                        <span className="rounded-full border border-border bg-surface/70 px-3 py-1.5">
                            Software development
                        </span>
                        <span className="rounded-full border border-border bg-surface/70 px-3 py-1.5">
                            Technical exploration
                        </span>
                    </div>
                </div>
            </section>

            {/* Project collection */}
            <section
                id="project-list"
                className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
            >
                {projects.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                        {projects.map((project) => {
                            const technologies =
                                project.projectDetails?.technologies
                                    ?.split(",")
                                    .map((technology) => technology.trim())
                                    .filter(Boolean) ?? [];

                            const date = project.date
                                ? new Date(project.date).toLocaleDateString(
                                    "en",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        timeZone: "UTC",
                                    },
                                )
                                : null;

                            return (
                                <article
                                    key={project.slug}
                                    className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_16px_50px_-24px_#A78BFA30]"
                                >
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        aria-label={`View ${project.title} project`}
                                        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden bg-surface-hover">
                                            {project.featuredImage?.node ? (
                                                <img
                                                    src={
                                                        project.featuredImage
                                                            .node.sourceUrl
                                                    }
                                                    alt={
                                                        project.featuredImage
                                                            .node.altText ||
                                                        project.title
                                                    }
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_#6D5A8730,_#111014_75%)]">
                                                    <FolderCode
                                                        size={40}
                                                        strokeWidth={1.2}
                                                        className="text-accent/70"
                                                    />
                                                </div>
                                            )}

                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

                                            <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-background/80 text-foreground opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                <ArrowUpRight size={18} />
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                                        {date && (
                                            <p className="text-xs font-medium uppercase tracking-wider text-muted">
                                                {date}
                                            </p>
                                        )}

                                        <h2 className="mt-2 break-words text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                                            >
                                                {project.title}
                                            </Link>
                                        </h2>

                                        {project.projectDetails?.description && (
                                            <p className="mt-3 line-clamp-3 break-words text-sm leading-7 text-muted">
                                                {
                                                    project.projectDetails
                                                        .description
                                                }
                                            </p>
                                        )}

                                        {technologies.length > 0 && (
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {technologies.map(
                                                    (technology) => (
                                                        <span
                                                            key={technology}
                                                            className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-muted"
                                                        >
                                                            {technology}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        )}

                                        <div className="mt-auto flex items-center justify-between border-t border-border pt-5 mt-6">
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                                            >
                                                View project
                                                <ArrowUpRight size={15} />
                                            </Link>

                                            <span className="text-xs text-muted">
                                                Case study
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
                        <FolderCode
                            size={32}
                            className="mx-auto text-muted"
                        />
                        <h2 className="mt-4 text-xl font-semibold text-foreground">
                            Projects are on the way.
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-muted">
                            Check back soon for new projects and technical
                            work.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
