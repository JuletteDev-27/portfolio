import { wordpress } from "@/lib/wordpress";
import { GET_PROJECTS } from "@/lib/queries";
import type { Project } from "@/types/project";
import Link from "next/link";


type GetProjectsResponse = {
    projects: {
        nodes: Project[];
    };
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
                        key={project.id}
                        href={`/projects/${project.slug}`}
                        className="block rounded-xl border p-6 transition hover:-translate-y-1"
                    >
                        <h2 className="text-2xl font-semibold">
                            {project.title}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            View project →
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
