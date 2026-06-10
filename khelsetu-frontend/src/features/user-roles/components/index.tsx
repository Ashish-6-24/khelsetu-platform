import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import type {
  Permission,
  Role,
  UserRole,
  UserWithRole,
} from '@features/user-roles/types';
import { Shield, Users } from 'lucide-react';

const roleColors: Record<Role, string> = {
  admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  organizer: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  scorer:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  viewer: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
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
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {role.name}
            </h3>
          </div>
          <Badge variant="default">{role.role}</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {role.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>{role.userCount} users</span>
          </div>
          <div className="space-y-1">
            {role.permissions.slice(0, 3).map((perm, i) => (
              <div key={i} className="text-xs text-gray-600 dark:text-gray-400">
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
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7F1D1D] to-[#991B1B] flex items-center justify-center text-white text-sm font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white text-sm">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
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
          className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Permissions Matrix
        </h3>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400">
                  Resource
                </th>
                {actions.map((action) => (
                  <th
                    key={action}
                    className="text-center py-2 px-3 text-gray-500 dark:text-gray-400 capitalize"
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
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-2 px-3 font-medium text-gray-900 dark:text-white capitalize">
                    {perm.resource}
                  </td>
                  {actions.map((action) => (
                    <td key={action} className="text-center py-2 px-3">
                      {perm.actions.includes(action) ? (
                        <span className="text-green-600 dark:text-green-400">
                          ✓
                        </span>
                      ) : (
                        <span className="text-gray-300 dark:text-gray-600">
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
