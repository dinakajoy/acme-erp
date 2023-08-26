import { useQuery } from '@apollo/client';
import get from 'lodash/get';

import QUERY_CURRENT_USER from '../currentUser.graphql';
import TARGET_USER_QUERY from './queryUser.graphql';

const SYSTEM_USER = '000000000000000000000000';

interface IfAuthenticatedUserSameAsUserProps {
  userId: string;
  children: React.ReactNode;
}

export default function IfAuthenticatedUserSameAsUser({
  userId,
  children = null
}: IfAuthenticatedUserSameAsUserProps) {
  const { data } = useQuery(TARGET_USER_QUERY, {
    variables: {
      userId
    },
    skip: userId === SYSTEM_USER
  });
  const { data: userData } = useQuery(QUERY_CURRENT_USER);

  const targetUser = get(data, 'user');
  const user = get(userData, 'currentUser');

  if (!user || !targetUser || userId === SYSTEM_USER) {
    return null;
  }

  if (typeof children === 'function') {
    return children({
      isSameLoggedUser: user._id === targetUser._id,
      targetUser
    });
  }

  if (user._id !== targetUser._id) {
    return null;
  }

  return children || null;
}
