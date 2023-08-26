import type * as Types from '../../graphql.d';

export type IsUserAuthorizedQueryVariables = Types.Exact<{
  permission: Types.Scalars['String'];
  data: Array<Types.InputMaybe<Types.PermissionData>> | Types.InputMaybe<Types.PermissionData>;
}>;


export type IsUserAuthorizedQuery = { __typename?: 'Query', isUserAuthorized: boolean };

declare const Document: import("graphql").DocumentNode; export default Document;