import { useQuery } from '@apollo/client';
import get from 'lodash/get';

import {
  INCUBATOR_USER_ROLES,
  STAFF_USERS_ROLES,
  MENTOR_USERS_ROLE,
  APPLICANT_USERS_ROLE,
  ADMIN_USERS_ROLES,
  STAFFS_AND_SUBADMIN_ROLES,
  ADMINS_AND_SUBADMIN_ROLES,
  ADMINS_AND_FOUNDERS_ROLES,
  ALLOWED_ROLES_AS_COACHING_EVALUATOR
} from '../roles';

import QUERY_CURRENT_USER from '../currentUser.graphql';

interface AuthenticatedUserRoleConditional {
  allowedRoles?: null | string[];
  forbiddenRoles?: null | string[];
  children: React.ReactNode;
  hasStartup?: boolean;
}

export function useIsAuthenticatedUserRole(allowedRoles) {
  const { data } = useQuery(QUERY_CURRENT_USER);
  const user = get(data, 'currentUser');

  if (!user) {
    return false;
  }

  return allowedRoles.includes(user.role);
}

export default function AuthenticatedUserRoleConditional({
  allowedRoles = null,
  forbiddenRoles = null,
  children = null,
  hasStartup = false
}: AuthenticatedUserRoleConditional) {
  const { data } = useQuery(QUERY_CURRENT_USER);
  const user = get(data, 'currentUser');

  if (!user) {
    return null;
  }

  if (typeof children === 'function') {
    return children({
      authorized:
        (allowedRoles && allowedRoles.includes(user.role)) ||
        (forbiddenRoles && !forbiddenRoles.includes(user.role)),
      role: user.role,
      userId: user._id,
      hasStartup: get(user, 'startups.length', 0) !== 0
    });
  }

  if (hasStartup && get(user, 'startups.length', 0) === 0) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  if (forbiddenRoles && forbiddenRoles.includes(user.role)) {
    return null;
  }

  return children || null;
}

export {
  INCUBATOR_USER_ROLES,
  STAFF_USERS_ROLES,
  MENTOR_USERS_ROLE,
  APPLICANT_USERS_ROLE,
  ADMIN_USERS_ROLES,
  STAFFS_AND_SUBADMIN_ROLES,
  ADMINS_AND_SUBADMIN_ROLES,
  ADMINS_AND_FOUNDERS_ROLES,
  ALLOWED_ROLES_AS_COACHING_EVALUATOR
};
