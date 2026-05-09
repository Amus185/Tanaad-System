/**
 * Auth middleware — runs before every Pages Function.
 * Verifies JWT and attaches user payload to context.data.
 * Replaces Flask's @login_required decorator.
 */
import { verifyJWT } from './_lib/auth';
import type { Env, AuthData } from './_lib/types';

const PUBLIC_PATHS = ['/api/auth/login'];

export const onRequest: PagesFunction<Env, string, AuthData> = async (context) => {
  const url = new URL(context.request.url);

  // Only intercept API routes
  if (!url.pathname.startsWith('/api/')) {
    return context.next();
  }

  // Allow public endpoints without auth
  if (PUBLIC_PATHS.includes(url.pathname)) {
    return context.next();
  }

  // Extract Bearer token
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const payload = await verifyJWT(token, context.env.JWT_SECRET);

  if (!payload) {
    return Response.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  // Attach verified user to context — available in all downstream handlers
  context.data.user = payload;

  return context.next();
};
