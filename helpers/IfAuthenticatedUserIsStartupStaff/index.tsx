import { useQuery } from '@apollo/client';
import get from 'lodash/get';

import QUERY_CURRENT_USER from '../currentUser.graphql';
import QUERY_STARTUP from './queryStartup.graphql';

export default function IfAuthenticatedUserIsStartupStaff({
  startupId,
  children
}) {
  const { data: userData } = useQuery(QUERY_CURRENT_USER);
  const { data: dataStartup } = useQuery(QUERY_STARTUP, {
    variables: { startupId }
  });
  const user = get(userData, 'currentUser');
  const startup = get(dataStartup, 'startup');

  if (!user || !startup) {
    return null;
  }
  const isStaff = startup.people.some(p => p._id === user._id);

  if (typeof children === 'function') {
    return children({ loggedUserIsStartupStaff: isStaff });
  }

  if (!isStaff) {
    return null;
  }

  return children;
}
