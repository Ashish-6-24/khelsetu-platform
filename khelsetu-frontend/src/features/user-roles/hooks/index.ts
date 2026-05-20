import type { Permission, Role } from '@features/user-roles/types';
import { ROLE_PERMISSIONS } from '@features/user-roles/types';
import { useUserRolesStore } from '@features/user-roles/store';

export const useUserRoles = () => {
  const {
    roles,
    users,
    currentRole,
    setRoles,
    setUsers,
    setCurrentRole,
    assignRole,
  } = useUserRolesStore();

  const hasPermission = (userRole: Role, resource: string, action: string): boolean => {
    const permissions = ROLE_PERMISSIONS[userRole];
    if (!permissions) return false;
    const perm = permissions.find((p) => p.resource === resource);
    return perm?.actions.includes(action) ?? false;
  };

  const getPermissionsForRole = (role: Role): Permission[] => {
    return ROLE_PERMISSIONS[role] ?? [];
  };

  const usersByRole = (role: Role): typeof users => {
    return users.filter((u) => u.role === role);
  };

  return {
    roles,
    users,
    currentRole,
    hasPermission,
    getPermissionsForRole,
    usersByRole,
    setRoles,
    setUsers,
    setCurrentRole,
    assignRole,
  };
};
