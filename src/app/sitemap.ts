
import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { wordpress } from "@/lib/wordpress";
import { GET_PROJECTS } from "@/lib/queries";
import type { Project } from "@/types/project";

type GetProjectsResponse = {
    projects: {
        nodes: Project[];
    };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await connection();

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/projects`,
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    try {
        const data = await wordpress.request<GetProjectsResponse>(
            GET_PROJECTS
        );

        const projectRoutes: MetadataRoute.Sitemap =
            data.projects.nodes.map((project) => ({
                url: `${baseUrl}/projects/${project.slug}`,
                lastModified: project.date,
                changeFrequency: "monthly",
                priority: 0.7,
            }));

        return [...staticRoutes, ...projectRoutes];
    } catch (error) {
        console.error("Failed to fetch projects for sitemap:", error);
        return staticRoutes;
    }
}
