import { useQuery } from '@apollo/client';

import { useIsAuthenticatedUserRole } from '../AuthenticatedUserRoleConditional';
import { useCurrentUser } from '../withCurrentUser';

import QUERY_INCUBATOR_FOR_EVENTS from '../../modules/events/EventsDashboard/queryIncubatorForEvents.graphql';

export function useIsUserAuthorizedToCreateEvent() {
  const { currentUser, loading } = useCurrentUser();

  const isAuthorizedRole = useIsAuthenticatedUserRole([
    'staff',
    'coach',
    'admin',
    'admin&coach',
    'subadmin'
  ]);
  const { data } = useQuery(QUERY_INCUBATOR_FOR_EVENTS);
  const { userRolesEventsPermission = [], usersEventPermission = [] } =
    data?.incubator ?? {};

  if (isAuthorizedRole) {
    return true;
  }

  if (loading) {
    return false;
  }

  return (
    userRolesEventsPermission?.includes(currentUser.role) ||
    usersEventPermission
      ?.filter(Boolean)
      .map(u => u?._id)
      .includes(currentUser._id)
  );
}

export function useIsUserAuthorizedToUpdateEvent(event) {
  const { currentUser } = useCurrentUser();
  const isAuthorizedRole = useIsAuthenticatedUserRole([
    'staff',
    'coach',
    'admin&coach',
    'admin'
  ]);
  const { data } = useQuery(QUERY_INCUBATOR_FOR_EVENTS);
  const { userRolesEventsPermission = [] } = data?.incubator ?? {};

  if (!event || !currentUser) {
    return {};
  }

  const isAssignedAdmin = (event.editPermission || [])
    .filter(Boolean)
    .some(option => option._id === currentUser._id);

  const isAuthor = currentUser._id === event.createdBy?._id;
  const isAuthorizedToFullyEdit =
    isAuthorizedRole ||
    isAssignedAdmin ||
    userRolesEventsPermission.includes(currentUser.role);

  const hostIds = event.hosts.filter(Boolean).map(host => host._id);
  const isHost = hostIds.includes(currentUser._id);

  return {
    isAuthorized:
      isAuthor ||
      isAuthorizedRole ||
      isAssignedAdmin ||
      isAuthorizedToFullyEdit,
    isAuthorizedToFullyEdit,
    isHost,
    isAuthor
  };
}

export default function AuthorizedUserForEvent({ event, children }) {
  const { isAuthorized, isHost } = useIsUserAuthorizedToUpdateEvent(event);

  if (typeof children === 'function') {
    return children({
      authorized: isAuthorized,
      isHost
    });
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
}
