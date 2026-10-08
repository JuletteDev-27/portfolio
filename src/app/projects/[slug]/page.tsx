import { notFound } from "next/navigation";
import { wordpress } from "@/lib/wordpress";
import { GET_PROJECT } from "@/lib/queries";
import Link from "next/link";

type Project = {
    id: string;
    title: string;
    slug: string;
    content: string;
    date: string;
};

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
        {
            slug,
        }
    );

    if (!data.project) {
        notFound();
    }

    const project = data.project;

    return (
        <main className="mx-auto max-w-4xl px-6 py-16">
            <article>
                <p className="text-sm text-gray-500">
                    {new Date(project.date).toLocaleDateString()}
                </p>

                <h1 className="mt-2 text-5xl font-bold">
                    {project.title}
                </h1>

                <div
                    className="prose mt-10 max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: project.content,
                    }}
                />
            </article>
        </main>
    );
}
