export type Role = 'admin' | 'organizer' | 'scorer' | 'viewer';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface UserRole {
  id: string;
  name: string;
  role: Role;
  permissions: Permission[];
  userCount: number;
  description: string;
}

export interface UserWithRole {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  lastActive: string;
}

export interface RoleState {
  roles: UserRole[];
  users: UserWithRole[];
  currentRole: Role | null;
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    {
      resource: 'tournaments',
      actions: ['create', 'read', 'update', 'delete'],
    },
    { resource: 'teams', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'billing', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'settings', actions: ['read', 'update'] },
  ],
  organizer: [
    { resource: 'tournaments', actions: ['create', 'read', 'update'] },
    { resource: 'teams', actions: ['create', 'read', 'update'] },
    { resource: 'matches', actions: ['create', 'read', 'update'] },
  ],
  scorer: [
    { resource: 'matches', actions: ['read', 'update'] },
    { resource: 'scores', actions: ['create', 'read', 'update'] },
  ],
  viewer: [
    { resource: 'tournaments', actions: ['read'] },
    { resource: 'teams', actions: ['read'] },
    { resource: 'matches', actions: ['read'] },
  ],
};
