export const instant = false;

import Link from "next/link";
import { wordpress } from "@/lib/wordpress";
import { GET_PROJECTS } from "@/lib/queries";
import type { Project } from "@/types/project";
import ProjectGrid from "@/components/ProjectGrid";
import TechStack from "@/components/TechStack";

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
            <section className="relative isolate overflow-hidden border-b border-border bg-gradient-to-br from-[#1D1A24] via-[#17141D] to-[#111014]">

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                >
                    <div className="absolute -top-40 right-[-5rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl sm:right-0" />
                    <div className="absolute bottom-[-10rem] left-[-5rem] h-72 w-72 rounded-full bg-accent-secondary/10 blur-3xl" />
                </div> <div className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-sm text-muted">
                            <span className="h-2 w-2 rounded-full bg-accent" />
                            Full-Stack Developer
                        </div>

                        <h1 className="mt-8 text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                            Building software
                            <br className="hidden sm:block" /> that solves
                            <span className="text-accent"> real problems.</span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                            I build web applications and software systems,
                            working across frontend, backend, databases, and
                            infrastructure to create reliable, maintainable
                            solutions.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-medium text-background transition hover:bg-accent-secondary"
                            >
                                Explore my work
                                <span aria-hidden="true">↗</span>
                            </Link>

                            <a
                                href="#contact"
                                className="inline-flex items-center rounded-lg border border-border bg-surface/60 px-5 py-3 font-medium text-foreground transition hover:border-accent/60 hover:bg-surface"
                            >
                                Get in touch
                            </a>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                            <span className="flex items-center gap-2">
                                <span className="text-accent">✳</span>
                                Full-stack development
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-accent">✳</span>
                                Systems engineering
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-accent">✳</span>
                                Cybersecurity
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                                Selected work
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Featured projects
                            </h2>

                            <p className="mt-4 max-w-xl leading-7 text-muted">
                                A selection of projects exploring software
                                development, problem-solving, and engineering.
                            </p>
                        </div>

                        <Link
                            href="/projects"
                            className="inline-flex w-fit items-center gap-2 font-medium text-accent transition hover:text-accent-secondary"
                        >
                            View all projects
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <ProjectGrid projects={projects} />
                </div>
            </section>

            {/* Technology Stack */}
            <TechStack />

            {/* About */}
            <section className="border-b border-border">
                <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                            About me
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            I care about how software works, not just how it looks.
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-muted">
                            Software development · Systems engineering · Security
                        </p>
                    </div>

                    <div>
                        <p className="text-lg leading-8 text-foreground">
                            I build software with an interest in the systems
                            behind it. From developing web applications and
                            working with databases to exploring lower-level
                            programming and Linux environments, I enjoy
                            understanding how the pieces fit together.
                        </p>

                        <p className="mt-5 leading-7 text-muted">
                            I value practical problem-solving, maintainable
                            code, and understanding the fundamentals behind
                            the tools I use. My interests extend beyond the
                            application layer into systems engineering,
                            networking, and cybersecurity.
                        </p>

                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-foreground">
                                Technologies & interests
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {[
                                    "TypeScript",
                                    "React",
                                    "Next.js",
                                    "Python",
                                    "C++",
                                    "SQL",
                                    "Linux",
                                    "Networking",
                                    "Cybersecurity",
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted transition hover:border-accent/50 hover:text-accent"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact */}
            <section
                id="contact"
                className="relative isolate overflow-hidden border-t border-border"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10"
                >
                    <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
                    <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-accent-secondary/5 blur-3xl" />
                </div>

                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                                Get in touch
                            </p>

                            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Have a problem
                                <br />
                                worth solving?
                            </h2>

                            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
                                I’m interested in building useful software,
                                exploring challenging technical problems, and
                                turning ideas into working solutions. If you
                                have a project or an interesting problem to
                                discuss, get in touch.
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-4 lg:items-end">
                            <a
                                href="mailto:pequejulette012702@gmail.com"
                                className="inline-flex items-center gap-3 rounded-lg bg-accent px-6 py-3.5 font-semibold text-background transition hover:bg-accent-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                            >
                                Send me an email
                                <span aria-hidden="true">↗</span>
                            </a>

                            <a
                                href="mailto:pequejulette012702@gmail.com"
                                className="break-all text-sm text-muted transition hover:text-accent"
                            >
                                pequejulette012702@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-border pt-6">
                        <p className="text-sm text-muted">
                            Open to meaningful technical discussions and
                            interesting projects.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

