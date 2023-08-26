import { useQuery } from '@apollo/client';
import get from 'lodash/get';

import { useCurrentUser } from '../withCurrentUser';

import rbacRules from './rbacRules';

import QUERY_IS_USER_AUTHORIZED from './queryIsAuthorized.graphql';

interface IsUserAuthorizedProps {
  permission: string;
  data?: { key: string; value: string }[];
  children: React.ReactNode;
}

const useUserHasPermission = (role, permission) => {
  const permissions = rbacRules[role];

  if (!permissions) {
    return {
      hit: false,
      authorized: false,
      dynamic: false
    };
  }

  return {
    hit: true,
    authorized: (permissions.static || []).includes(permission),
    dynamic: (permissions.dynamic || []).includes(permission)
  };
};

export const useIsUserAuthorized = (
  permission: string,
  values: { key: string; value: string }[] = []
) => {
  const { currentUser, loading: loadingCurrentUser } = useCurrentUser();

  const { hit, authorized, dynamic } = useUserHasPermission(
    currentUser?.role,
    permission
  );

  const { data, loading, error } = useQuery(QUERY_IS_USER_AUTHORIZED, {
    variables: {
      permission,
      data: values
    },
    skip: !dynamic
  });

  if (loadingCurrentUser || loading) {
    return {
      isUserAuthorized: false,
      loading: true
    };
  }

  if (error || !hit) {
    return {
      isUserAuthorized: false
    };
  }

  return {
    isUserAuthorized: authorized || get(data, 'isUserAuthorized')
  };
};

export default function IsUserAuthorized({
  permission,
  data: values = [],
  children = null
}: IsUserAuthorizedProps) {
  const { loading, isUserAuthorized } = useIsUserAuthorized(permission, values);

  if (loading) {
    return null;
  }

  if (typeof children === 'function') {
    return children({
      isUserAuthorized
    });
  }

  if (!isUserAuthorized) {
    return null;
  }

  return children || null;
}
