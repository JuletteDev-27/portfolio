export const instant = false;
import Link from "next/link";
import { wordpress } from "@/lib/wordpress";
import { GET_PROJECTS } from "@/lib/queries";
import type { Project } from "@/types/project";
import ProjectGrid from "@/components/ProjectGrid";
type GetProjectsResponse = {
    projects: {
        nodes: Project[];
    };
};

export default async function Home() {
    const data = await wordpress.request<GetProjectsResponse>(
        GET_PROJECTS,
    );

    const projects = data.projects.nodes.slice(0, 3);

    return (
        <main>
            {/* Hero */}
            <section className="mx-auto max-w-6xl px-6 py-24">
                <p className="text-sm font-medium text-gray-500">
                    Full-Stack Developer
                </p>

                <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
                    I build web applications and software systems.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                    I’m a full-stack developer focused on building reliable,
                    maintainable applications using modern web technologies.
                </p>

                <div className="mt-8 flex gap-4">
                    <Link
                        href="/projects"
                        className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
                    >
                        View Projects
                    </Link>

                    <a
                        href="#contact"
                        className="rounded-lg border px-5 py-3 text-sm font-medium"
                    >
                        Contact Me
                    </a>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="border-t">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Selected Work
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                Featured Projects
                            </h2>
                        </div>

                        <Link
                            href="/projects"
                            className="text-sm font-medium underline"
                        >
                            View all
                        </Link>
                    </div>
                    <ProjectGrid projects={projects} />
                </div>
            </section>

            {/* About */}
            <section className="border-t">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <p className="text-sm font-medium text-gray-500">
                        About
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        A developer who likes understanding how things work.
                    </h2>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        I work across frontend, backend, databases, APIs, and
                        infrastructure. I enjoy building systems from the ground
                        up and understanding what happens underneath the
                        abstractions.
                    </p>
                </div>
            </section>

            {/* Contact */}
            <section
                id="contact"
                className="border-t"
            >
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <p className="text-sm font-medium text-gray-500">
                        Contact
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        Let’s build something.
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Interested in working together? Get in touch.
                    </p>

                    <a
                        href="mailto:your-email@example.com"
                        className="mt-6 inline-block font-medium underline"
                    >
                        pequejulette012702@gmail.com
                    </a>
                </div>
            </section>
        </main>
    );
}
