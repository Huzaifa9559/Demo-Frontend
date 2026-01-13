import { gql } from '@apollo/client';

export const GET_PROJECTS_QUERY = gql`
  query GetProjects($input: ProjectsQueryInput) {
    projects(input: $input) {
      data {
        id
        projectCode
        name
        owner
        status
        dueDate
        tickets
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

export const GET_PROJECT_QUERY = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      projectCode
      name
      owner
      status
      dueDate
      tickets
      createdAt
      updatedAt
    }
  }
`;

