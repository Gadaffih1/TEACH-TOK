// PROTOTYPE ONLY: client-side localStorage auth is not secure. Replace with a real backend.
import type { LoginInput, ProfilePatch, SignUpInput, StoredUser, UserAccount } from './types';

const USERS_KEY = 'teachtok.users';
const SESSION_KEY = 'teachtok.session';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

const enc = new TextEncoder();

const toHex = (buf: ArrayBuffer | Uint8Array) =>
  Array.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const randomSalt = () => toHex(crypto.getRandomValues(new Uint8Array(16)));

const randomId = () =>
  typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `u-${Date.now()}-${toHex(crypto.getRandomValues(new Uint8Array(4)))}`;

async function hashPassword(password: string, salt: string): Promise<string> {
  if (!crypto.subtle) throw new AuthError('Secure crypto is unavailable in this browser context.');
  return toHex(await crypto.subtle.digest('SHA-256', enc.encode(`${salt}:${password}`)));
}

function isStoredUser(u: unknown): u is StoredUser {
  if (!u || typeof u !== 'object') return false;
  const r = u as Record<string, unknown>;
  return (
    typeof r.id === 'string' &&
    typeof r.email === 'string' &&
    typeof r.passwordHash === 'string' &&
    typeof r.salt === 'string' &&
    (r.role === 'teacher' || r.role === 'admin') &&
    typeof r.displayName === 'string'
  );
}

function readUsers(): StoredUser[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
    return Array.isArray(parsed)
      ? parsed.filter(isStoredUser).map((u) => ({ ...u, subjects: Array.isArray(u.subjects) ? u.subjects : [] }))
      : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    throw new AuthError('Unable to save account data in this browser.');
  }
}

function setSession(id: string) {
  try {
    localStorage.setItem(SESSION_KEY, id);
  } catch {
    throw new AuthError('Unable to start a session in this browser.');
  }
}

function toPublic(user: StoredUser): UserAccount {
  const { passwordHash: _p, salt: _s, ...account } = user;
  return account;
}

const slugHandle = (name: string) =>
  '@' + (name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'teacher');

/** Seeds a demo admin + teacher the first time the app runs. */
export async function seedDemoUsers(): Promise<void> {
  if (readUsers().length > 0) return;
  const now = new Date().toISOString();
  const make = async (
    partial: Pick<UserAccount, 'email' | 'displayName' | 'role'>,
    password: string,
  ): Promise<StoredUser> => {
    const salt = randomSalt();
    return {
      id: randomId(),
      handle: slugHandle(partial.displayName),
      subjects: ['Math'],
      gradeBand: 'Middle School (6-8)',
      isActive: true,
      createdAt: now,
      updatedAt: now,
      salt,
      passwordHash: await hashPassword(password, salt),
      ...partial,
    };
  };
  writeUsers([
    await make({ email: 'admin@teachtok.dev', displayName: 'Admin', role: 'admin' }, 'admin1234'),
    await make({ email: 'teacher@teachtok.dev', displayName: 'Demo Teacher', role: 'teacher' }, 'teacher1234'),
  ]);
}

export async function signUp(input: SignUpInput): Promise<UserAccount> {
  const email = input.email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new AuthError('Enter a valid email address.');
  if (input.password.length < 8) throw new AuthError('Password must be at least 8 characters.');
  if (!input.displayName.trim()) throw new AuthError('Display name is required.');

  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    throw new AuthError('An account with this email already exists.');
  }

  const now = new Date().toISOString();
  const salt = randomSalt();
  const user: StoredUser = {
    id: randomId(),
    email,
    displayName: input.displayName.trim(),
    handle: slugHandle(input.displayName),
    role: 'teacher', // admins are never self-assigned
    school: input.school?.trim() || undefined,
    subjects: input.subjects,
    gradeBand: input.gradeBand,
    isActive: true,
    createdAt: now,
    updatedAt: now,
    salt,
    passwordHash: await hashPassword(input.password, salt),
  };
  writeUsers([...users, user]);
  setSession(user.id);
  return toPublic(user);
}

export async function login(input: LoginInput): Promise<UserAccount> {
  const email = input.email.trim().toLowerCase();
  const user = readUsers().find((u) => u.email === email);
  const invalid = new AuthError('Invalid email or password.');
  if (!user) throw invalid;
  if ((await hashPassword(input.password, user.salt)) !== user.passwordHash) throw invalid;
  if (!user.isActive) throw new AuthError('This account has been deactivated.');
  setSession(user.id);
  return toPublic(user);
}

export function logout(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function getSessionUser(): UserAccount | null {
  try {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    const user = readUsers().find((u) => u.id === id && u.isActive);
    return user ? toPublic(user) : null;
  } catch {
    return null;
  }
}

export function updateProfile(id: string, patch: ProfilePatch): UserAccount {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new AuthError('User not found.');
  users[idx] = { ...users[idx], ...patch, updatedAt: new Date().toISOString() };
  writeUsers(users);
  return toPublic(users[idx]);
}
