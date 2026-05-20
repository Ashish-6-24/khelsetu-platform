import type { Role, UserRole, UserWithRole } from '@features/user-roles/types';
import { ROLE_PERMISSIONS } from '@features/user-roles/types';
import { create } from 'zustand';

const mockRoles: UserRole[] = [
  { id: 'r1', name: 'Administrator', role: 'admin', permissions: ROLE_PERMISSIONS.admin, userCount: 3, description: 'Full access to all features' },
  { id: 'r2', name: 'Organizer', role: 'organizer', permissions: ROLE_PERMISSIONS.organizer, userCount: 12, description: 'Manage tournaments and teams' },
  { id: 'r3', name: 'Scorer', role: 'scorer', permissions: ROLE_PERMISSIONS.scorer, userCount: 25, description: 'Score matches and update results' },
  { id: 'r4', name: 'Viewer', role: 'viewer', permissions: ROLE_PERMISSIONS.viewer, userCount: 150, description: 'Read-only access' },
];

const mockUsers: UserWithRole[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@khelsetu.com', role: 'admin', lastActive: new Date().toISOString() },
  { id: 'u2', name: 'Tournament Org', email: 'org@khelsetu.com', role: 'organizer', lastActive: new Date().toISOString() },
  { id: 'u3', name: 'Match Scorer', email: 'scorer@khelsetu.com', role: 'scorer', lastActive: new Date().toISOString() },
  { id: 'u4', name: 'Guest Viewer', email: 'viewer@khelsetu.com', role: 'viewer', lastActive: new Date().toISOString() },
];

interface UserRolesState {
  roles: UserRole[];
  users: UserWithRole[];
  currentRole: Role | null;
  setRoles: (roles: UserRole[]) => void;
  setUsers: (users: UserWithRole[]) => void;
  setCurrentRole: (role: Role | null) => void;
  assignRole: (userId: string, role: Role) => void;
}

export const useUserRolesStore = create<UserRolesState>((set) => ({
  roles: mockRoles,
  users: mockUsers,
  currentRole: null,
  setRoles: (roles) => set({ roles }),
  setUsers: (users) => set({ users }),
  setCurrentRole: (role) => set({ currentRole: role }),
  assignRole: (userId, role) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === userId ? { ...u, role } : u)),
    })),
}));
