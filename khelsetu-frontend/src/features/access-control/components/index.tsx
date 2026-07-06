import type {
  Permission,
  Role,
  UserRole,
  UserWithRole,
} from '@features/access-control/types';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/ui/Card';
import { Shield, Users } from 'lucide-react';

const roleColors: Record<Role, string> = {
  admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  organizer: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  scorer:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  viewer:
    'bg-gray-100 text-[var(--text-primary)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-secondary)]',
};

interface RoleCardProps {
  role: UserRole;
  onSelect: (role: Role) => void;
  isSelected: boolean;
}

export const RoleCard = ({ role, onSelect, isSelected }: RoleCardProps) => {
  return (
    <Card className={isSelected ? 'ring-2 ring-blue-500' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              {role.name}
            </h3>
          </div>
          <Badge variant="default">{role.role}</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            {role.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            <Users className="w-4 h-4" />
            <span>{role.userCount} users</span>
          </div>
          <div className="space-y-1">
            {role.permissions.slice(0, 3).map((perm, i) => (
              <div
                key={i}
                className="text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]"
              >
                <strong>{perm.resource}:</strong> {perm.actions.join(', ')}
              </div>
            ))}
            {role.permissions.length > 3 && (
              <p className="text-xs text-blue-600 dark:text-blue-400">
                +{role.permissions.length - 3} more
              </p>
            )}
          </div>
          <Button
            variant={isSelected ? 'primary' : 'outline'}
            className="w-full"
            onClick={() => onSelect(role.role)}
          >
            {isSelected ? 'Selected' : 'View Details'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

interface UserRowProps {
  user: UserWithRole;
  onRoleChange: (userId: string, role: Role) => void;
}

export const UserRow = ({ user, onRoleChange }: UserRowProps) => {
  const roles: Role[] = ['admin', 'organizer', 'scorer', 'viewer'];

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] flex items-center justify-center text-white text-sm font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-[var(--text-primary)] dark:text-white text-sm">
            {user.name}
          </p>
          <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            {user.email}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-1 text-xs rounded-full capitalize ${roleColors[user.role]}`}
        >
          {user.role}
        </span>
        <select
          value={user.role}
          onChange={(e) => onRoleChange(user.id, e.target.value as Role)}
          className="text-sm border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] rounded-lg px-2 py-1 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] text-[var(--text-primary)] dark:text-white"
        >
          {roles.map((role) => (
            <option key={role} value={role} className="capitalize">
              {role}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

interface PermissionTableProps {
  permissions: Permission[];
}

export const PermissionTable = ({ permissions }: PermissionTableProps) => {
  const actions = ['create', 'read', 'update', 'delete'];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
          Permissions Matrix
        </h3>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
                <th className="text-left py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  Resource
                </th>
                {actions.map((action) => (
                  <th
                    key={action}
                    className="text-center py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] capitalize"
                  >
                    {action}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm) => (
                <tr
                  key={perm.resource}
                  className="border-b border-gray-100 dark:border-[var(--border-subtle)]"
                >
                  <td className="py-2 px-3 font-medium text-[var(--text-primary)] dark:text-white capitalize">
                    {perm.resource}
                  </td>
                  {actions.map((action) => (
                    <td key={action} className="text-center py-2 px-3">
                      {perm.actions.includes(action) ? (
                        <span className="text-green-600 dark:text-green-400">
                          ✓
                        </span>
                      ) : (
                        <span className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                          ✗
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};
