import { useContext } from 'react';

import { useQuery } from '@apollo/client';

import AppContext from '../../components/AppContext/AppContext';

import INCUBATOR_QUERY from '../incubator.graphql';

export default function Incubator({ children }) {
  const { incubator } = useContext(AppContext);
  const { data, loading } = useQuery(INCUBATOR_QUERY, {
    variables: { incubatorId: incubator }
  });

  if (loading || !data) {
    return null;
  }

  return children({ incubator: data.incubator });
}
