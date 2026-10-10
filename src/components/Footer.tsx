import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Julette Anthony C. Peque. All rights reserved.
                </p>

                <div className="flex gap-5 text-sm">
                    <Link
                        href="/"
                        className="text-gray-500 transition hover:text-black"
                    >
                        Home
                    </Link>

                    <Link
                        href="/projects"
                        className="text-gray-500 transition hover:text-black"
                    >
                        Projects
                    </Link>

                    <a
                        href="https://github.com/YOUR_USERNAME"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 transition hover:text-black"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://www.linkedin.com/in/YOUR_USERNAME"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 transition hover:text-black"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
