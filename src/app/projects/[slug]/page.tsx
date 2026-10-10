
export const instant = false;

import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    Code2,
    ExternalLink,
    Layers3,
} from "lucide-react";
import { siGithub } from "simple-icons";
import { wordpress } from "@/lib/wordpress";
import { GET_PROJECT } from "@/lib/queries";
import type { Project } from "@/types/project";
import type { Metadata } from "next";

type GetProjectResponse = {
    project: Project | null;
};

type ProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;

    const data = await wordpress.request<GetProjectResponse>(
        GET_PROJECT,
        { slug },
    );

    const project = data.project;

    if (!project) {
        return {
            title: "Project Not Found",
            description: "The requested project could not be found.",
        };
    }

    const description =
        project.projectDetails?.description ||
        `Explore ${project.title}, including its technologies and implementation details.`;

    return {
        title: project.title,
        description: description.slice(0, 160),
        openGraph: {
            title: project.title,
            description: description.slice(0, 160),
            type: "article",
            images: project.featuredImage?.node?.sourceUrl
                ? [project.featuredImage.node.sourceUrl]
                : undefined,
        },
    };
}

export default async function ProjectPage({
    params,
}: ProjectPageProps) {
    const { slug } = await params;

    const data = await wordpress.request<GetProjectResponse>(
        GET_PROJECT,
        { slug },
    );

    if (!data.project) {
        notFound();
    }

    const project = data.project;
    const details = project.projectDetails;

    const normalizeValue = (value: unknown): string => {
        if (typeof value === "string") {
            return value.replaceAll("_", " ");
        }

        if (Array.isArray(value)) {
            return value
                .map((item) => String(item))
                .join(", ")
                .replaceAll("_", " ");
        }

        if (value && typeof value === "object") {
            const record = value as Record<string, unknown>;

            if (typeof record.label === "string") {
                return record.label;
            }

            if (typeof record.value === "string") {
                return record.value.replaceAll("_", " ");
            }
        }

        return "";
    };

    const technologies =
        details?.technologies
            ?.split(",")
            .map((technology) => technology.trim())
            .filter(Boolean) ?? [];

    const projectType = normalizeValue(details?.projectType);
    const status = normalizeValue(details?.status);

    const publishedDate = project.date
        ? new Date(project.date).toLocaleDateString("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        })
        : null;

    return (
        <main className="min-h-screen">
            <article>
                {/* Breadcrumb */}
                <div className="mx-auto max-w-6xl px-6 pt-10">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
                    >
                        <ArrowLeft
                            size={16}
                            className="transition-transform group-hover:-translate-x-1"
                        />
                        All projects
                    </Link>
                </div>

                {/* Project hero */}
                <header className="relative mx-auto max-w-6xl overflow-hidden px-6 pb-12 pt-14 sm:pb-16 sm:pt-20">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-[#A78BFA]/10 blur-[100px]"
                    />

                    {projectType && (
                        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                            <Layers3 size={15} />
                            {projectType}
                        </p>
                    )}

                    <h1 className="mt-5 max-w-4xl break-words text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                        {project.title}
                    </h1>

                    {details?.description && (
                        <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
                            {details.description}
                        </p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        {details?.githubUrl && (
                            <a
                                href={details.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-[#111014] transition hover:bg-accent-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="h-[18px] w-[18px] fill-current"
                                >
                                    <path d={siGithub.path} />
                                </svg>
                                View source code
                                <ArrowUpRight size={16} />
                            </a>
                        )}

                        {details?.liveUrl && (
                            <a
                                href={details.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-border-hover hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                            >
                                Live demo
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>

                    {(status || publishedDate) && (
                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                            {status && (
                                <span className="inline-flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-accent" />
                                    <span className="capitalize">{status}</span>
                                </span>
                            )}

                            {publishedDate && (
                                <span className="inline-flex items-center gap-2">
                                    <CalendarDays size={15} />
                                    Published {publishedDate}
                                </span>
                            )}
                        </div>
                    )}
                </header>

                {/* Featured image */}
                {project.featuredImage?.node && (
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/20 sm:rounded-3xl">
                            <img
                                src={project.featuredImage.node.sourceUrl}
                                alt={
                                    project.featuredImage.node.altText ||
                                    `${project.title} preview`
                                }
                                fetchPriority="high"
                                className="aspect-video w-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Project details */}
                <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                                <Code2 size={19} />
                            </span>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                                    Project overview
                                </p>
                                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                                    About this project
                                </h2>
                            </div>
                        </div>

                        <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-5 sm:p-8">
                            {details?.description ? (
                                <p className="whitespace-pre-line break-words text-base leading-8 text-muted">
                                    {details.description}
                                </p>
                            ) : (
                                <p className="text-sm leading-7 text-muted">
                                    More information about this project will
                                    be added soon.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Metadata sidebar */}
                    <aside className="min-w-0 space-y-6">
                        <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                            <h2 className="text-sm font-semibold text-foreground">
                                Project information
                            </h2>

                            <dl className="mt-5 space-y-5">
                                {projectType && (
                                    <div>
                                        <dt className="text-xs text-muted">
                                            Project type
                                        </dt>
                                        <dd className="mt-1 break-words text-sm font-medium capitalize text-foreground">
                                            {projectType}
                                        </dd>
                                    </div>
                                )}

                                {status && (
                                    <div>
                                        <dt className="text-xs text-muted">
                                            Status
                                        </dt>
                                        <dd className="mt-1 break-words text-sm font-medium capitalize text-foreground">
                                            {status}
                                        </dd>
                                    </div>
                                )}

                                {publishedDate && (
                                    <div>
                                        <dt className="text-xs text-muted">
                                            Published
                                        </dt>
                                        <dd className="mt-1 text-sm font-medium text-foreground">
                                            {publishedDate}
                                        </dd>
                                    </div>
                                )}

                                <div>
                                    <dt className="text-xs text-muted">
                                        Technologies
                                    </dt>
                                    <dd className="mt-1 text-sm font-medium text-foreground">
                                        {technologies.length}
                                        {technologies.length === 1
                                            ? " technology"
                                            : " technologies"}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        {technologies.length > 0 && (
                            <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                                <h2 className="text-sm font-semibold text-foreground">
                                    Built with
                                </h2>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {technologies.map((technology) => (
                                        <span
                                            key={technology}
                                            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-hover hover:text-accent"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {(details?.githubUrl || details?.liveUrl) && (
                            <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                                <h2 className="text-sm font-semibold text-foreground">
                                    Explore further
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-muted">
                                    Take a closer look at the code or explore
                                    the running application.
                                </p>

                                <div className="mt-4 space-y-3">
                                    {details.githubUrl && (
                                        <a
                                            href={details.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <svg
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    className="h-4 w-4 shrink-0 fill-current"
                                                >
                                                    <path d={siGithub.path} />
                                                </svg>
                                                Source code
                                            </span>
                                            <ArrowUpRight size={15} />
                                        </a>
                                    )}

                                    {details.liveUrl && (
                                        <a
                                            href={details.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <ExternalLink size={15} />
                                                Live application
                                            </span>
                                            <ArrowUpRight size={15} />
                                        </a>
                                    )}
                                </div>
                            </section>
                        )}
                    </aside>
                </div>

                {/* Back navigation */}
                <div className="border-t border-border">
                    <div className="mx-auto max-w-6xl px-6 py-10">
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
                        >
                            <ArrowLeft
                                size={16}
                                className="transition-transform group-hover:-translate-x-1"
                            />
                            Back to all projects
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
