import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import IfStartupStaffOrAuthorizedRole from '../index';

import QUERY_CURRENT_USER from '../../currentUser.graphql';
import QUERY_STARTUP from '../../IfAuthenticatedUserIsStartupStaff/queryStartup.graphql';

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
  api: null,
  avatar: null,
  cover: null,
  linkedCalendar: null,
  country: null,
  gender: null,
  birthday: null,
  locations: null,
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

describe('IfStartupStaffOrAuthorizedRole', () => {
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

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfStartupStaffOrAuthorizedRole startupId="123" roles={['admin']}>
          <div>Member of the startup</div>
        </IfStartupStaffOrAuthorizedRole>
      </MockedProvider>
    );

    const element = await findByText('Member of the startup');
    expect(element).toHaveTextContent('Member of the startup');
  });

  it('should render if current user has an authorized role', async () => {
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
              people: []
            }
          }
        }
      }
    ];

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfStartupStaffOrAuthorizedRole startupId="123" roles={['admin']}>
          <div>Not a member, but authorized role</div>
        </IfStartupStaffOrAuthorizedRole>
      </MockedProvider>
    );

    const element = await findByText('Not a member, but authorized role');
    expect(element).toHaveTextContent('Not a member, but authorized role');
  });

  it('should not render if current user is not authorized or is not a member of the startup', async () => {
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
              people: []
            }
          }
        }
      }
    ];

    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfStartupStaffOrAuthorizedRole startupId="123" roles={['admin&coach']}>
          <div>I should not see this</div>
        </IfStartupStaffOrAuthorizedRole>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('I should not see this')).not.toBeInTheDocument();
    });
  });
});
