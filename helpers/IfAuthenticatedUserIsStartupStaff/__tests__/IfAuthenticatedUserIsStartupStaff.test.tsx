import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import IfAuthenticatedUserIsStartupStaff from '../index';

import QUERY_CURRENT_USER from '../../currentUser.graphql';
import QUERY_STARTUP from '../queryStartup.graphql';

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
  api: null,
  info: null,
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

const currentUserMock = {
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
};

describe('IfAuthenticatedUserIsStartupStaff', () => {
  it('should render if current user is member of the startup', async () => {
    const mocks = [
      currentUserMock,
      {
        request: {
          query: QUERY_STARTUP,
          variables: {
            startupId: '123'
          }
        },
        result: {
          data: {
            startup: {
              _id: '123',
              people: [{ _id: currentUserMock.result.data.currentUser._id }]
            }
          }
        }
      }
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfAuthenticatedUserIsStartupStaff startupId="123">
          <div>Authorized</div>
        </IfAuthenticatedUserIsStartupStaff>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Authorized')).toBeInTheDocument();
    });
  });

  it('should not render if current user is not part of the startup', async () => {
    const mocks = [
      currentUserMock,
      {
        request: {
          query: QUERY_STARTUP,
          variables: {
            startupId: '123'
          }
        },
        result: {
          data: {
            startup: {
              _id: '123',
              people: [{ _id: 'wrong' }]
            }
          }
        }
      }
    ];

    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfAuthenticatedUserIsStartupStaff startupId="123">
          <div>Authorized</div>
        </IfAuthenticatedUserIsStartupStaff>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Authorized')).not.toBeInTheDocument();
    });
  });

  it('should call function if the user is a member of the startup', async () => {
    const mocks = [
      currentUserMock,
      {
        request: {
          query: QUERY_STARTUP,
          variables: {
            startupId: '123'
          }
        },
        result: {
          data: {
            startup: {
              _id: '123',
              people: [{ _id: currentUserMock.result.data.currentUser._id }]
            }
          }
        }
      }
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfAuthenticatedUserIsStartupStaff startupId="123">
          {({ loggedUserIsStartupStaff }) => {
            if (loggedUserIsStartupStaff) {
              return <div>loggedUserIsStartupStaff</div>;
            }

            return null;
          }}
        </IfAuthenticatedUserIsStartupStaff>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('loggedUserIsStartupStaff')).toBeInTheDocument();
    });
  });

  it('should call function if the user is not a member of the startup', async () => {
    const mocks = [
      currentUserMock,
      {
        request: {
          query: QUERY_STARTUP,
          variables: {
            startupId: '123'
          }
        },
        result: {
          data: {
            startup: {
              _id: '123',
              people: [{ _id: 'wrong' }]
            }
          }
        }
      }
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfAuthenticatedUserIsStartupStaff startupId="123">
          {({ isSameLoggedUser }) => {
            if (isSameLoggedUser) {
              return null;
            }

            return <div>I should see this</div>;
          }}
        </IfAuthenticatedUserIsStartupStaff>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('I should see this')).toBeInTheDocument();
    });
  });
});
