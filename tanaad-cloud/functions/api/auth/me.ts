/**
 * GET /api/auth/me
 * Returns the current authenticated user's info.
 */
import { findOne } from '../../_lib/db';
import type { Env, AuthData, UserRow, UserProfileRow } from '../../_lib/types';

export const onRequestGet: PagesFunction<Env, string, AuthData> = async (context) => {
  const { user } = context.data;

  const dbUser = await findOne<UserRow & Partial<UserProfileRow>>(
    context.env.DB,
    `SELECT u.id, u.username, u.email, u.role, u.is_active, u.last_login,
            p.first_name, p.last_name, p.phone, p.avatar
     FROM users u
     LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE u.id = ?`,
    [user.sub],
  );

  if (!dbUser) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json({
    id: dbUser.id,
    username: dbUser.username,
    email: dbUser.email,
    role: dbUser.role,
    first_name: dbUser.first_name ?? '',
    last_name: dbUser.last_name ?? '',
    phone: dbUser.phone ?? '',
    avatar: dbUser.avatar ?? '',
    last_login: dbUser.last_login,
  });
};
