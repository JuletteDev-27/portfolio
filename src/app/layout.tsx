import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { warn } from "console";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    title: {
        default: "Julette Anthony C. Peque | Full-Stack Developer",
        template: "%s | Julette",
    },
    description:
        "Portfolio of Julette Anthony C. Peque, a full-stack developer building web applications, software, and digital experiences.",
    openGraph: {
        title: "Julette Anthony C. Peque | Full-Stack Developer",
        description:
            "Explore my projects, technical skills, and development work.",
        type: "website",
        siteName: "Julette Anthony C. Peque Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Julette Anthony C. Peque | Full-Stack Developer",
        description:
            "Explore my projects, technical skills, and development work.",
    },
}; export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
