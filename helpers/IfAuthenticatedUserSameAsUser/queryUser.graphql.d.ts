import type * as Types from '../../graphql.d';

export type IfSameUserAsOrAuthorizedRoleQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type IfSameUserAsOrAuthorizedRoleQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, role: string } | null };

declare const Document: import("graphql").DocumentNode; export default Document;