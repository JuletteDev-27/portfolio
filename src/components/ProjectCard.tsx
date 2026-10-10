
import Link from "next/link";
import type { Project } from "@/types/project";

type ProjectCardProps = {
    project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
    const technologies =
        project.projectDetails?.technologies
            ?.split(",")
            .map((technology) => technology.trim())
            .filter(Boolean) ?? [];

    return (
        <article className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
            <Link
                href={`/projects/${project.slug}`}
                className="block"
            >
                {project.featuredImage?.node && (
                    <div className="aspect-video w-full overflow-hidden bg-white/5">
                        <img
                            src={project.featuredImage.node.sourceUrl}
                            alt={
                                project.featuredImage.node.altText || project.title
                            }
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="p-6">
                    <h3 className="break-words text-xl font-semibold tracking-tight text-white">
                        {project.title}
                    </h3>

                    {project.projectDetails?.description && (
                        <p className="mt-3 break-words text-sm leading-6 text-gray-400">
                            {project.projectDetails.description}
                        </p>
                    )}
                </div>
            </Link>

            {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 px-6 pb-6">
                    {technologies.map((technology) => (
                        <span
                            key={technology}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                        >
                            {technology}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}
