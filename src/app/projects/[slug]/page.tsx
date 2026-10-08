import { notFound } from "next/navigation";
import { wordpress } from "@/lib/wordpress";
import { GET_PROJECT } from "@/lib/queries";
import { Project } from "@/types/project";

type GetProjectResponse = {
    project: Project | null;
};

type ProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

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

    const project = data.project;
    const details = project.projectDetails;

    const technologies = details.technologies
        .split(",")
        .map((technology) => technology.trim());

    return (
        <main className="mx-auto max-w-5xl px-6 py-16">
            <article>
                {project.featuredImage?.node && (
                    <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
                        <img
                            src={project.featuredImage.node.sourceUrl}
                            alt={project.featuredImage.node.altText || project.title}
                            className="h-full w-full object-cover"
                        />                    </div>
                )} <div className="mb-8">
                    <p className="text-sm uppercase tracking-wide text-gray-500">
                        {details.projectType}
                    </p>

                    <h1 className="mt-2 text-5xl font-bold">
                        {project.title}
                    </h1>

                    <p className="mt-4 text-xl text-gray-600">
                        {details.description}
                    </p>
                </div>

                <div className="mb-8 flex gap-3">
                    <span className="rounded-full border px-3 py-1 text-sm">
                        {details.status}
                    </span>
                </div>

                <div className="mb-10 flex gap-4">
                    {details.githubUrl && (
                        <a
                            href={details.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border px-4 py-2"
                        >
                            GitHub
                        </a>
                    )}

                    {details.liveUrl && (
                        <a
                            href={details.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-black px-4 py-2 text-white"
                        >
                            Live Demo
                        </a>
                    )}
                </div>

                <div className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        Technologies
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-full border px-3 py-1 text-sm"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                </div>

                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: project.content,
                    }}
                />
            </article>
        </main>
    );
}
