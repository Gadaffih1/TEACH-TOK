import type { GradeBand } from '../types';

export type UserRole = 'teacher' | 'admin';

export interface UserAccount {
  id: string;
  email: string;
  displayName: string;
  handle: string;
  role: UserRole;
  school?: string;
  subjects: string[];
  gradeBand: GradeBand;
  bio?: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Stored record: the account plus credentials. Never expose outside authService. */
export interface StoredUser extends UserAccount {
  passwordHash: string;
  salt: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  displayName: string;
  school?: string;
  subjects: string[];
  gradeBand: GradeBand;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type ProfilePatch = Partial<
  Pick<UserAccount, 'displayName' | 'school' | 'subjects' | 'gradeBand' | 'bio' | 'avatarUrl'>
>;

export type Permission =
  | 'video:create'
  | 'video:interact'
  | 'comment:create'
  | 'moderate:content'
  | 'admin:users';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  teacher: ['video:create', 'video:interact', 'comment:create'],
  admin: ['video:create', 'video:interact', 'comment:create', 'moderate:content', 'admin:users'],
};
