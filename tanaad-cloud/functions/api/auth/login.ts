/**
 * POST /api/auth/login
 * Authenticates user and returns a JWT.
 * Replaces Flask's auth_bp /login route.
 */
import { signJWT } from '../../_lib/auth';
import { verifyPassword } from '../../_lib/hashing';
import { findOne, execute } from '../../_lib/db';
import type { Env, AuthData, UserRow } from '../../_lib/types';

export const onRequestPost: PagesFunction<Env, string, AuthData> = async (context) => {
  try {
    const body = await context.request.json<{
      username?: string;
      password?: string;
      role?: string;
    }>();

    const { username, password, role } = body;

    if (!username || !password || !role) {
      return Response.json(
        { error: 'Username, password, and role are required' },
        { status: 400 },
      );
    }

    // Find user by username
    const user = await findOne<UserRow>(
      context.env.DB,
      'SELECT id, username, email, password_hash, role, is_active FROM users WHERE username = ?',
      [username.trim()],
    );

    if (!user) {
      return Response.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Verify password (Werkzeug-compatible PBKDF2)
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return Response.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Check role matches
    if (user.role.toLowerCase() !== role.toLowerCase()) {
      return Response.json(
        { error: `You are not registered as ${role}` },
        { status: 403 },
      );
    }

    // Check active
    if (!user.is_active) {
      return Response.json(
        { error: 'Your account is inactive. Contact admin.' },
        { status: 403 },
      );
    }

    // Issue JWT
    const token = await signJWT(
      { sub: user.id, username: user.username, role: user.role },
      context.env.JWT_SECRET,
    );

    // Update last_login
    await execute(
      context.env.DB,
      'UPDATE users SET last_login = ? WHERE id = ?',
      [new Date().toISOString(), user.id],
    );

    return Response.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};
