import {
  PermissionTable,
  RoleCard,
  UserRow,
} from '@features/access-control/components';
import { useUserRoles } from '@features/access-control/hooks';
import type { Role } from '@features/access-control/types';
import { Tabs } from '@shared/ui/Tabs';

import { useState } from 'react';

const TABS = [
  { id: 'roles', label: 'Roles' },
  { id: 'users', label: 'Users' },
  { id: 'permissions', label: 'Permissions' },
];

export const UserRolesPage = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const {
    roles,
    users,
    currentRole,
    getPermissionsForRole,
    setCurrentRole,
    assignRole,
  } = useUserRoles();

  const permissions = currentRole ? getPermissionsForRole(currentRole) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          User Roles & Permissions
        </h1>
        <p className="text-[var(--text-tertiary)] mt-1">
          Manage user roles, permissions, and access control
        </p>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onSelect={setCurrentRole}
              isSelected={currentRole === role.role}
            />
          ))}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-3">
          {users.map((user) => (
            <UserRow key={user.id} user={user} onRoleChange={assignRole} />
          ))}
        </div>
      )}

      {activeTab === 'permissions' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['admin', 'organizer', 'scorer', 'viewer'] as Role[]).map(
              (role) => (
                <button
                  key={role}
                  onClick={() => setCurrentRole(role)}
                  className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
                    currentRole === role
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'bg-[var(--bg-surface-sunken)] text-[var(--text-secondary)]'
                  }`}
                >
                  {role}
                </button>
              ),
            )}
          </div>
          {permissions.length > 0 && (
            <PermissionTable permissions={permissions} />
          )}
        </div>
      )}
    </div>
  );
};
