"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/#contact" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="min-w-0 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-base"
                >
                    Julette Anthony
                    <span className="ml-1 text-accent">C. Peque</span>
                </Link>

                {/* Desktop navigation */}
                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-7 text-sm md:flex"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-medium text-muted transition-colors hover:text-accent"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile menu toggle */}
                <button
                    type="button"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-accent/50 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? (
                        <X size={20} aria-hidden="true" />
                    ) : (
                        <Menu size={20} aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* Mobile navigation */}
            {menuOpen && (
                <nav
                    id="mobile-navigation"
                    aria-label="Mobile navigation"
                    className="border-t border-border bg-background px-4 py-3 md:hidden sm:px-6"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="flex min-h-12 items-center justify-between rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-accent"
                        >
                            {link.label}
                            <ArrowUpRight
                                size={16}
                                aria-hidden="true"
                                className="text-muted"
                            />
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );

}

