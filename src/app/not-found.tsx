
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Error 404
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                Page not found
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-500">
                The page you are looking for does not exist
                or may have been moved.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                    href="/"
                    className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Back to Home
                </Link>

                <Link
                    href="/projects"
                    className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
                >
                    Browse Projects
                </Link>
            </div>
        </main>
    );
}
