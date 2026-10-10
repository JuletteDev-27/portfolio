import { wordpress } from "@/lib/wordpress";
import { GET_PROJECTS } from "@/lib/queries";
import type { Project } from "@/types/project";
import Link from "next/link";
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

    return (
        <main className="mx-auto max-w-6xl px-6 py-16">
            <h1 className="text-4xl font-bold">
                Projects
            </h1>

            <p className="mt-4 text-gray-600">
                A collection of projects I've built.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                {data.projects.nodes.map((project) => (
                    <Link
                        href={`/projects/${project.slug}`}
                        className="group block overflow-hidden rounded-2xl border"
                    >
                        {project.featuredImage?.node && (
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.featuredImage.node.sourceUrl}
                                    alt={project.featuredImage.node.altText || project.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        )}

                        <div className="p-6">
                            <p className="text-sm text-gray-500">
                                {new Date(project.date).toLocaleDateString()}
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold">
                                {project.title}
                            </h2>

                            {project.projectDetails?.description && (
                                <p className="mt-3 text-gray-600">
                                    {project.projectDetails.description}
                                </p>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.projectDetails?.technologies
                                    .split(",")
                                    .map((technology) => (
                                        <span
                                            key={technology.trim()}
                                            className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                                        >
                                            {technology.trim()}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </Link>))}
            </div>
        </main>
    );
}
