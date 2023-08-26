import React from 'react';

import AuthenticatedUserRoleConditional from '../AuthenticatedUserRoleConditional';
import IfAuthenticatedUserSameAsUser from '../IfAuthenticatedUserSameAsUser';
import {
  INCUBATOR_USER_ROLES,
  STAFF_USERS_ROLES,
  MENTOR_USERS_ROLE
} from '../roles';

interface IfSameUserAsOrAuthorizedRoleProps {
  userId: string;
  roles: string[];
  children: null | React.ReactNode;
  authorizeIfTargetUserIsSameRole?: boolean;
}

function RenderComponent({ children, authorized }) {
  if (typeof children === 'function') {
    return children({ authorized });
  }

  if (!authorized) {
    return null;
  }

  return children;
}

export default function IfSameUserAsOrAuthorizedRole({
  userId,
  roles,
  children = null,
  authorizeIfTargetUserIsSameRole = true
}: IfSameUserAsOrAuthorizedRoleProps) {
  return (
    <AuthenticatedUserRoleConditional>
      {({ authorized, role: currentUserRole }) =>
        authorized ||
        (authorizeIfTargetUserIsSameRole && roles.includes(currentUserRole)) ? (
          <RenderComponent authorized>{children}</RenderComponent>
        ) : (
          <IfAuthenticatedUserSameAsUser userId={userId}>
            {({ isSameLoggedUser, targetUser }) => {
              const isAuthorized =
                isSameLoggedUser ||
                (!authorizeIfTargetUserIsSameRole &&
                  roles.includes(currentUserRole) &&
                  !roles.includes(targetUser.role));

              return (
                <RenderComponent authorized={isAuthorized}>
                  {children}
                </RenderComponent>
              );
            }}
          </IfAuthenticatedUserSameAsUser>
        )
      }
    </AuthenticatedUserRoleConditional>
  );
}

export { INCUBATOR_USER_ROLES, STAFF_USERS_ROLES, MENTOR_USERS_ROLE };
