import { describe, expect, it } from 'vitest';
import { ROLE_PERMISSIONS } from '@features/user-roles/types';

const hasPermission = (role: string, resource: string, action: string): boolean => {
  const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];
  if (!permissions) return false;
  const perm = permissions.find((p) => p.resource === resource);
  return perm?.actions.includes(action) ?? false;
};

describe('User Roles Utilities', () => {
  it('should check admin permissions correctly', () => {
    expect(hasPermission('admin', 'tournaments', 'create')).toBe(true);
    expect(hasPermission('admin', 'tournaments', 'delete')).toBe(true);
    expect(hasPermission('admin', 'users', 'read')).toBe(true);
    expect(hasPermission('admin', 'billing', 'update')).toBe(true);
  });

  it('should check organizer permissions correctly', () => {
    expect(hasPermission('organizer', 'tournaments', 'create')).toBe(true);
    expect(hasPermission('organizer', 'tournaments', 'delete')).toBe(false);
    expect(hasPermission('organizer', 'users', 'read')).toBe(false);
  });

  it('should check scorer permissions correctly', () => {
    expect(hasPermission('scorer', 'matches', 'read')).toBe(true);
    expect(hasPermission('scorer', 'matches', 'update')).toBe(true);
    expect(hasPermission('scorer', 'scores', 'create')).toBe(true);
    expect(hasPermission('scorer', 'tournaments', 'create')).toBe(false);
  });

  it('should check viewer permissions correctly', () => {
    expect(hasPermission('viewer', 'tournaments', 'read')).toBe(true);
    expect(hasPermission('viewer', 'tournaments', 'create')).toBe(false);
    expect(hasPermission('viewer', 'teams', 'read')).toBe(true);
    expect(hasPermission('viewer', 'matches', 'update')).toBe(false);
  });

  it('should deny permissions for unknown roles', () => {
    expect(hasPermission('unknown', 'tournaments', 'read')).toBe(false);
  });
});
