import { wordpress } from "@/lib/wordpress";
import { GET_POSTS } from "@/lib/queries";

type Post = {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
};

type GetPostsResponse = {
    posts: {
        nodes: Post[];
    };
};

export default async function Home() {
    const data = await wordpress.request<GetPostsResponse>(GET_POSTS);

    return (
        <main className="mx-auto max-w-4xl p-8">
            <h1 className="mb-8 text-4xl font-bold">
                My Portfolio
            </h1>

            <section>
                <h2 className="mb-4 text-2xl font-semibold">
                    Latest Posts
                </h2>

                <div className="space-y-6">
                    {data.posts.nodes.map((post) => (
                        <article key={post.id}>
                            <h3 className="text-xl font-semibold">
                                {post.title}
                            </h3>

                            <p
                                className="mt-2 text-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: post.excerpt,
                                }}
                            />
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
