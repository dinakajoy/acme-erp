export const INCUBATOR_USER_ROLES = [
  'staff',
  'coach',
  'evaluator',
  'expert',
  'mentor',
  'subadmin',
  'admin',
  'admin&coach'
];

export const STAFF_USERS_ROLES = ['staff', 'coach', 'admin&coach', 'admin'];

export const MENTOR_USERS_ROLE = ['mentor', 'expert'];
export const APPLICANT_USERS_ROLE = [
  'cofounder',
  'applicant',
  'community_member'
];
export const ADMIN_USERS_ROLES = ['admin&coach', 'admin'];

export const APPLICANT_AND_STAFF_USER_ROLE = [
  ...STAFF_USERS_ROLES,
  ...APPLICANT_USERS_ROLE
];

export const STAFFS_AND_SUBADMIN_ROLES = [
  'staff',
  'coach',
  'subadmin',
  'admin&coach',
  'admin'
];

export const ALLOWED_ROLES_AS_EVALUATION_VIEWER = [
  'staff',
  'coach',
  'subadmin',
  'admin&coach',
  'admin',
  'evaluator',
  'mentor',
  'expert'
];

export const ADMINS_AND_SUBADMIN_ROLES = ['subadmin', 'admin&coach', 'admin'];

export const ADMINS_AND_FOUNDERS_ROLES = [
  'subadmin',
  'admin&coach',
  'admin',
  'cofounder'
];

export const ALLOWED_ROLES_AS_COACHING_EVALUATOR = [
  'expert',
  'mentor',
  'coach',
  'staff',
  'subadmin',
  'admin',
  'admin&coach'
];
