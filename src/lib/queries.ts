import { gql } from "graphql-request";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        slug
        date
        excerpt
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      nodes {
        id
        title
        slug
        date
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($slug: ID!) {
    project(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      date
    }
  }
`;
