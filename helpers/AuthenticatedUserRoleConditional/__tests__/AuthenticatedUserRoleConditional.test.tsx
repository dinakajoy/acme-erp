import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AuthenticatedUserRoleConditional from '../index';

import QUERY_CURRENT_USER from '../../currentUser.graphql';

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: QUERY_CURRENT_USER
    },
    result: {
      data: {
        currentUser: {
          _id: '123456',
          name: null,
          firstName: null,
          lastName: null,
          fullName: null,
          headline: null,
          phone: null,
          incubator: null,
          startups: null,
          email: null,
          role: 'admin',
          bio: null,
          api: null,
          wordFrom: null,
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
        }
      }
    }
  }
];

describe('AuthenticatedUserRoleConditional', () => {
  it('should render if current user is allowed', async () => {
    const { container, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserRoleConditional allowedRoles={['admin']}>
          <div>Authorized</div>
        </AuthenticatedUserRoleConditional>
      </MockedProvider>
    );

    await findByText('Authorized');
    expect(container.firstChild).toHaveTextContent('Authorized');
  });

  it('should not render if current user is not allowed', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserRoleConditional allowedRoles={['coach']}>
          <div>Authorized</div>
        </AuthenticatedUserRoleConditional>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Authorized')).not.toBeInTheDocument();
    });
  });

  it('should render if current user is not forbidden', async () => {
    const { container, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserRoleConditional forbiddenRoles={['coach']}>
          <div>Authorized</div>
        </AuthenticatedUserRoleConditional>
      </MockedProvider>
    );

    await findByText('Authorized');
    expect(container.firstChild).toHaveTextContent('Authorized');
  });

  it('should not render if current user is forbidden', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserRoleConditional forbiddenRoles={['admin']}>
          <div>Authorized</div>
        </AuthenticatedUserRoleConditional>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Authorized')).not.toBeInTheDocument();
    });
  });

  it('should call function if current user is allowed', async () => {
    const { container, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserRoleConditional allowedRoles={['admin']}>
          {({ authorized }) => {
            if (authorized) {
              return <div>Authorized</div>;
            }

            return <div>Unauthorized</div>;
          }}
        </AuthenticatedUserRoleConditional>
      </MockedProvider>
    );

    await findByText('Authorized');
    expect(container.firstChild).toHaveTextContent('Authorized');
  });

  it('should call function if current user is not allowed', async () => {
    const { container, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserRoleConditional allowedRoles={['coach']}>
          {({ authorized }) => {
            if (authorized) {
              return <div>Authorized</div>;
            }

            return <div>Unauthorized</div>;
          }}
        </AuthenticatedUserRoleConditional>
      </MockedProvider>
    );

    await findByText('Unauthorized');
    expect(container.firstChild).toHaveTextContent('Unauthorized');
  });
});
