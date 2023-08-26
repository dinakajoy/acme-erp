import React from 'react';

import AuthenticatedUserRoleConditional from '../AuthenticatedUserRoleConditional';
import IfAuthenticatedUserIsStartupStaff from '../IfAuthenticatedUserIsStartupStaff';

interface IfStartupStaffOrAuthorizedRoleProps {
  startupId: string;
  roles: string[];
  children: null | React.ReactNode;
}

export default function IfStartupStaffOrAuthorizedRole({
  startupId,
  roles,
  children = null
}: IfStartupStaffOrAuthorizedRoleProps) {
  return (
    <AuthenticatedUserRoleConditional allowedRoles={roles}>
      {({ authorized: loggedUserIsAuthorized }) => (
        <IfAuthenticatedUserIsStartupStaff startupId={startupId}>
          {({ loggedUserIsStartupStaff }) => {
            if (typeof children === 'function') {
              return children({
                loggedUserIsStartupStaff,
                loggedUserIsAuthorized
              });
            }

            if (!loggedUserIsStartupStaff && !loggedUserIsAuthorized) {
              return null;
            }

            return children;
          }}
        </IfAuthenticatedUserIsStartupStaff>
      )}
    </AuthenticatedUserRoleConditional>
  );
}
