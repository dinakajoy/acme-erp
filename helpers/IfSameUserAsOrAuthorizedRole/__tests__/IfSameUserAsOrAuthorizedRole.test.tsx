import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import IfSameUserAsOrAuthorizedRole from '../index';

import QUERY_CURRENT_USER from '../../currentUser.graphql';
import QUERY_TARGET_USER from '../../IfAuthenticatedUserSameAsUser/queryUser.graphql';

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
  api: null,
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

describe('IfSameUserAsOrAuthorizedRole', () => {
  it('should render if current user is same as target user', async () => {
    const mocks = [
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

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfSameUserAsOrAuthorizedRole userId="123456" roles={['admin']}>
          <div>Authorized</div>
        </IfSameUserAsOrAuthorizedRole>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Authorized')).toBeInTheDocument();
    });
  });

  it('should render if current user is allowed role', async () => {
    const mocks = [
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

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfSameUserAsOrAuthorizedRole userId="123" roles={['admin']}>
          <div>Authorized</div>
        </IfSameUserAsOrAuthorizedRole>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Authorized')).toBeInTheDocument();
    });
  });

  it('should not render if current user is allowed role and it has the same role as the target user', async () => {
    const mocks = [
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

    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfSameUserAsOrAuthorizedRole
          userId="123"
          roles={['admin']}
          authorizeIfTargetUserIsSameRole={false}
        >
          <div>Authorized</div>
        </IfSameUserAsOrAuthorizedRole>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Authorized')).not.toBeInTheDocument();
    });
  });

  it('should call function - different role user as target user role - allowed', async () => {
    const mocks = [
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
              role: 'applicant'
            }
          }
        }
      }
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfSameUserAsOrAuthorizedRole
          userId="123"
          roles={['admin']}
          authorizeIfTargetUserIsSameRole={false}
        >
          {({ authorized }) => {
            if (authorized) {
              return <div>Authorized</div>;
            }

            return <div>Unauthorized - Same Role</div>;
          }}
        </IfSameUserAsOrAuthorizedRole>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Authorized')).toBeInTheDocument();
    });
  });

  it('should call function - same user role as target user role - not allowed', async () => {
    const mocks = [
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

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IfSameUserAsOrAuthorizedRole
          userId="123"
          roles={['admin']}
          authorizeIfTargetUserIsSameRole={false}
        >
          {({ authorized }) => {
            if (authorized) {
              return <div>Authorized</div>;
            }

            return <div>Unauthorized - Same Role</div>;
          }}
        </IfSameUserAsOrAuthorizedRole>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Unauthorized - Same Role')).toBeInTheDocument();
    });
  });
});
