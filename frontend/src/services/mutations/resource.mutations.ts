import { gql } from '@apollo/client';

export const CREATE_RESOURCE_MUTATION = gql`
  mutation CreateResource($input: CreateResourceInput!) {
    createResource(input: $input) {
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

export const UPDATE_RESOURCE_MUTATION = gql`
  mutation UpdateResource($id: ID!, $input: UpdateResourceInput!) {
    updateResource(id: $id, input: $input) {
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

export const DELETE_RESOURCE_MUTATION = gql`
  mutation DeleteResource($id: ID!) {
    deleteResource(id: $id)
  }
`;
