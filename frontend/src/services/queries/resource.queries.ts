import { gql } from '@apollo/client';

export const GET_RESOURCES_QUERY = gql`
  query GetResources($input: ResourcesQueryInput) {
    resources(input: $input) {
      data {
        key
        title
        description
        type
        category
        url
        tags
        status
        author
        createdAt
        updatedAt
      }
      meta {
        page
        take
        totalItems
        totalPages
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

export const GET_RESOURCE_QUERY = gql`
  query GetResource($id: ID!) {
    resource(id: $id) {
      key
      title
      description
      type
      category
      url
      tags
      status
      author
      createdAt
      updatedAt
    }
  }
`;
