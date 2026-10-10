
"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function ErrorPage({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Something went wrong
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                We hit a snag.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-500">
                The page could not be loaded. This may be a temporary
                issue. Try again, or return to the homepage.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => reset()}
                    className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Try Again
                </button>

                <Link
                    href="/"
                    className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
