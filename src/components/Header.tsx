import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <Link
                    href="/"
                    className="font-semibold"
                >
                    Julette Anthony C. Peque
                </Link>

                <nav className="flex items-center gap-6 text-sm">
                    <Link
                        href="/"
                        className="text-gray-600 transition hover:text-black"
                    >
                        Home
                    </Link>

                    <Link
                        href="/projects"
                        className="text-gray-600 transition hover:text-black"
                    >
                        Projects
                    </Link>

                    <Link
                        href="/#contact"
                        className="text-gray-600 transition hover:text-black"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
