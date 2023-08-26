import { useQuery } from '@apollo/client';

import { useAuthContext } from '../../components/AuthContext/AuthProvider';

import CURRENT_USER_QUERY from '../currentUser.graphql';

export default function CurrentUser({ children }) {
  const { isAuthenticated } = useAuthContext();
  const { loading, data } = useQuery(CURRENT_USER_QUERY);

  if (!isAuthenticated) {
    return null;
  }

  if (loading || !data) {
    return null;
  }
  return children({ user: data.currentUser });
}
