
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                    © 2026 Julette Anthony Peque. All rights reserved.
                </p>

                <div className="flex gap-5 text-sm text-gray-500">
                    <Link
                        href="/"
                        className="transition hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        href="/projects"
                        className="transition hover:text-white"
                    >
                        Projects
                    </Link>

                    <a
                        href="https://github.com/JuletteDev-27"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-white"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://www.linkedin.com/in/julette-anthony-peque-50425532a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-white"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
