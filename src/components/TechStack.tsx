
import {
    siCplusplus,
    siCss,
    siGit,
    siGithub,
    siHtml5,
    siJavascript,
    siLinux,
    siNextdotjs,
    siPostgresql,
    siPython,
    siReact,
    siSupabase,
    siTailwindcss,
    siTypescript,
} from "simple-icons";

const technologies = [
    { name: "React", icon: siReact, category: "Frontend" },
    { name: "Next.js", icon: siNextdotjs, category: "Frontend" },
    { name: "TypeScript", icon: siTypescript, category: "Frontend" },
    { name: "JavaScript", icon: siJavascript, category: "Frontend" },
    { name: "HTML5", icon: siHtml5, category: "Frontend" },
    { name: "CSS", icon: siCss, category: "Frontend" },
    { name: "Tailwind CSS", icon: siTailwindcss, category: "Frontend" },
    { name: "Python", icon: siPython, category: "Programming" },
    { name: "C++", icon: siCplusplus, category: "Programming" },
    { name: "PostgreSQL", icon: siPostgresql, category: "Database" },
    { name: "Supabase", icon: siSupabase, category: "Database" },
    { name: "Linux", icon: siLinux, category: "Infrastructure" },
    { name: "Git", icon: siGit, category: "Tools" },
    { name: "GitHub", icon: siGithub, category: "Tools" },
];

const categories = [
    "Frontend",
    "Programming",
    "Database",
    "Infrastructure",
    "Tools",
];

export default function TechStack() {
    return (
        <section
            id="tech-stack"
            aria-labelledby="tech-stack-heading"
            className="border-t border-border"
        >
            <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
                <div className="mb-12 max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        The toolkit
                    </p>

                    <h2
                        id="tech-stack-heading"
                        className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl"
                    >
                        Technologies I work with.
                    </h2>

                    <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
                        The languages, frameworks, and tools I use to build
                        applications, work with data, and understand systems
                        from the ground up.
                    </p>
                </div>

                <div className="space-y-10">
                    {categories.map((category) => {
                        const items = technologies.filter(
                            (technology) => technology.category === category,
                        );

                        return (
                            <div
                                key={category}
                                className="grid gap-4 sm:grid-cols-[160px_1fr] sm:gap-8"
                            >
                                <h3 className="pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                                    {category}
                                </h3>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {items.map((technology) => (
                                        <div
                                            key={technology.name}
                                            className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition duration-200 hover:-translate-y-1 hover:border-border-hover hover:bg-surface-hover"
                                        >
                                            <svg
                                                role="img"
                                                aria-label={`${technology.name} logo`}
                                                viewBox="0 0 24 24"
                                                className="h-7 w-7 shrink-0 fill-current text-muted transition-colors group-hover:text-accent"
                                            >
                                                <path
                                                    d={technology.icon.path}
                                                />
                                            </svg>

                                            <span className="text-sm font-medium text-foreground">
                                                {technology.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
