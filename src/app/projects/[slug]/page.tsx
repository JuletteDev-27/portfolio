
export const instant = false;
import { notFound } from "next/navigation";
import Link from "next/link";
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
        { slug }
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
        { slug }
    );

    if (!data.project) {
        notFound();
    }

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

    const project = data.project;
    const details = project.projectDetails;

    const technologies =
        details?.technologies
            ?.split(",")
            .map((technology) => technology.trim())
            .filter(Boolean) ?? [];

    const projectType = normalizeValue(details?.projectType);
    const status = normalizeValue(details?.status);

    return (
        <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <article>
                <Link
                    href="/projects"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
                >
                    <span aria-hidden="true">←</span>
                    All projects
                </Link>

                {project.featuredImage?.node && (
                    <div className="mb-10 aspect-video overflow-hidden rounded-2xl border border-gray-200">
                        <img
                            src={project.featuredImage.node.sourceUrl}
                            alt={
                                project.featuredImage.node.altText || project.title
                            }
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                <header className="mb-8">
                    {projectType && (
                        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                            {projectType}
                        </p>
                    )}

                    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                        {project.title}
                    </h1>

                    {details?.description && (
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                            {details.description}
                        </p>
                    )}
                </header>

                {(status || project.date) && (
                    <div className="mb-8 flex flex-wrap gap-3">
                        {status && (
                            <span className="rounded-full border border-gray-200 px-3 py-1.5 text-sm capitalize">
                                Status: {status}
                            </span>
                        )}

                        {project.date && (
                            <span className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600">
                                Published{" "}
                                {new Date(project.date).toLocaleDateString("en", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    timeZone: "UTC",
                                })}
                            </span>
                        )}
                    </div>
                )}

                {(details?.githubUrl || details?.liveUrl) && (
                    <div className="mb-12 flex flex-wrap gap-3">
                        {details.githubUrl && (
                            <a
                                href={details.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
                            >
                                View Source Code ↗
                            </a>
                        )}

                        {details.liveUrl && (
                            <a
                                href={details.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                Live Demo ↗
                            </a>
                        )}
                    </div>
                )}

                {technologies.length > 0 && (
                    <section className="mb-12 border-y border-gray-200 py-8">
                        <h2 className="mb-4 text-xl font-semibold">
                            Technologies Used
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

            </article>
        </main>
    );
}
