import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import IfAuthenticatedUserSameAsUser from '../index';

import QUERY_CURRENT_USER from '../../currentUser.graphql';
import QUERY_TARGET_USER from '../queryUser.graphql';

afterEach(cleanup);

const userResponse = {
  name: null,
  firstName: null,
  lastName: null,
  fullName: null,
  headline: null,
  phone: null,
  incubator: null,
  startups: null,
  email: null,
  bio: null,
  wordFrom: null,
  avatar: null,
  cover: null,
  linkedCalendar: null,
  country: null,
  gender: null,
  birthday: null,
  locations: null,
  info: null,
  api: null,
  expertise: null,
  status: null,
  validated: null,
  adminValidated: null,
  countryOrigin: null,
  timezone: null,
  invitedBy: null,
  assignedStartups: null,
  workStatus: null,
  neomaFields: null,
  language: null,
  createdAt: null,
  updatedAt: null,
  isLead: null,
  industries: null,
  tags: [],
  programs: [],
  conferenceDataIntegration: null,
  chatNotification: true
};

const mocksSameUser = [
  {
    request: {
      query: QUERY_CURRENT_USER
    },
    result: {
      data: {
        currentUser: {
          _id: '123456',
          role: 'admin',
          ...userResponse
        }
      }
    }
  },
  {
    request: {
      query: QUERY_TARGET_USER,
      variables: {
        userId: '123456'
      }
    },
    result: {
      data: {
        user: {
          _id: '123456',
          role: 'admin'
        }
      }
    }
  }
];
const mocksDifferentUser = [
  {
    request: {
      query: QUERY_CURRENT_USER
    },
    result: {
      data: {
        currentUser: {
          _id: '123456',
          role: 'admin',
          ...userResponse
        }
      }
    }
  },
  {
    request: {
      query: QUERY_TARGET_USER,
      variables: {
        userId: '123'
      }
    },
    result: {
      data: {
        user: {
          _id: '123',
          role: 'admin'
        }
      }
    }
  }
];

describe('IfAuthenticatedUserSameAsUser', () => {
  it('should render if current user is same as target user', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocksSameUser} addTypename={false}>
        <IfAuthenticatedUserSameAsUser userId="123456">
          <div>Authorized</div>
        </IfAuthenticatedUserSameAsUser>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Authorized')).toBeInTheDocument();
    });
  });

  it('should not render if current user is not same as target user', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocksDifferentUser} addTypename={false}>
        <IfAuthenticatedUserSameAsUser userId="123">
          <div>Authorized</div>
        </IfAuthenticatedUserSameAsUser>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Authorized')).not.toBeInTheDocument();
    });
  });

  it('should call function if authenticated user is the same as target user', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocksSameUser} addTypename={false}>
        <IfAuthenticatedUserSameAsUser userId="123456">
          {({ isSameLoggedUser }) => {
            if (isSameLoggedUser) {
              return <div>Same user</div>;
            }

            return null;
          }}
        </IfAuthenticatedUserSameAsUser>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Same user')).toBeInTheDocument();
    });
  });

  it('should call function if authenticated user is not the same as target user', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocksDifferentUser} addTypename={false}>
        <IfAuthenticatedUserSameAsUser userId="123">
          {({ isSameLoggedUser }) => {
            if (isSameLoggedUser) {
              return null;
            }

            return <div>Not same user</div>;
          }}
        </IfAuthenticatedUserSameAsUser>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Not same user')).toBeInTheDocument();
    });
  });
});
