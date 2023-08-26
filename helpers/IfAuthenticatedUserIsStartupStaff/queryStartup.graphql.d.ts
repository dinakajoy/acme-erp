import type * as Types from '../../graphql.d';

export type IfAuthenticatedUserIsStartupStaffQueryVariables = Types.Exact<{
  startupId: Types.Scalars['ID'];
}>;


export type IfAuthenticatedUserIsStartupStaffQuery = { __typename?: 'Query', startup?: { __typename?: 'Startup', _id: string, people?: Array<{ __typename?: 'User', _id: string } | null> | null } | null };

declare const Document: import("graphql").DocumentNode; export default Document;