import React from 'react';

import { useQuery } from '@apollo/client';

import { useAuthContext } from '../components/AuthContext/AuthProvider';

import QUERY_CURRENT_USER, {
  WithCurrentUserQuery,
  WithCurrentUserQueryVariables
} from './currentUser.graphql';

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuthContext();
  const { loading, data, error } = useQuery<
    WithCurrentUserQuery,
    WithCurrentUserQueryVariables
  >(QUERY_CURRENT_USER, {
    returnPartialData: true,
    nextFetchPolicy: 'cache-only',
    skip: !isAuthenticated
  });

  return {
    loading,
    data,
    error,
    currentUser: data?.currentUser
  };
};

const withIncubator = Component => {
  const CurrentUserWrapper = props => {
    const { loading, currentUser } = useCurrentUser();

    if (loading) {
      return null;
    }

    return <Component currentUser={currentUser} {...props} />;
  };

  return CurrentUserWrapper;
};

export default withIncubator;
