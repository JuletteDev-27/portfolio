import { GraphQLClient } from "graphql-request";

const endpoint = process.env.WORDPRESS_GRAPHQL_URL;

if (!endpoint) {
    throw new Error("WORDPRESS_GRAPHQL_URL is not defined");
}

export const wordpress = new GraphQLClient(endpoint);
